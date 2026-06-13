const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
// Optional admin key protecting GET /api/inquiries. When unset, the endpoint is
// restricted to loopback requests only (see below).
const ADMIN_KEY = process.env.ADMIN_KEY || '';

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Field length limits for the contact form (defensive against oversized bodies).
const LIMITS = { firstName: 100, lastName: 100, email: 200, inquiryType: 100, message: 5000 };

app.use(express.json());
app.use(express.static(PUBLIC_DIR));

function readJson(file, fallback) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
        return fallback;
    }
}

// Atomic-ish write: write to a temp file, then rename over the target so a crash
// mid-write can't corrupt the data file.
function writeJsonSafe(file, value) {
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(value, null, 2), 'utf8');
    fs.renameSync(tmp, file);
}

function isLoopback(req) {
    const ip = req.ip || (req.socket && req.socket.remoteAddress) || '';
    return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
}

// --- Simple in-memory, per-IP rate limiter (no external dependency) ---
const rateHits = new Map();
function rateLimited(req, max, windowMs) {
    const ip = req.ip || (req.socket && req.socket.remoteAddress) || 'unknown';
    const now = Date.now();
    const hits = (rateHits.get(ip) || []).filter(t => now - t < windowMs);
    hits.push(now);
    rateHits.set(ip, hits);
    return hits.length > max;
}

// --- API: portfolio projects ---
app.get('/api/projects', (req, res) => {
    const projects = readJson(PROJECTS_FILE, []);
    const { category } = req.query;
    if (category && category !== 'all') {
        return res.json(projects.filter(p => p.categories.includes(category)));
    }
    res.json(projects);
});

// --- API: contact form ---
app.post('/api/contact', (req, res) => {
    // Honeypot: a hidden "website" field that real users never fill in. If it has
    // content, silently accept the request without storing anything (anti-spam).
    if (req.body && typeof req.body.website === 'string' && req.body.website.trim()) {
        return res.status(201).json({ ok: true, id: null });
    }

    if (rateLimited(req, 5, 60_000)) {
        return res.status(429).json({ ok: false, errors: ['Too many requests. Please wait a moment and try again.'] });
    }

    const { firstName, lastName, email, inquiryType, message } = req.body || {};

    const errors = [];
    if (!firstName || !firstName.trim()) errors.push('First name is required.');
    if (!lastName || !lastName.trim()) errors.push('Last name is required.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email is required.');
    if (!message || !message.trim()) errors.push('Message is required.');
    for (const [field, max] of Object.entries(LIMITS)) {
        const value = req.body && req.body[field];
        if (typeof value === 'string' && value.length > max) {
            errors.push(`${field} must be at most ${max} characters.`);
        }
    }

    if (errors.length) {
        return res.status(400).json({ ok: false, errors });
    }

    const inquiries = readJson(INQUIRIES_FILE, []);
    const nextId = inquiries.reduce((max, q) => Math.max(max, q.id || 0), 0) + 1;
    const inquiry = {
        id: nextId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        inquiryType: (inquiryType || 'Unspecified').trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString()
    };
    inquiries.push(inquiry);
    writeJsonSafe(INQUIRIES_FILE, inquiries);

    res.status(201).json({ ok: true, message: 'Inquiry received successfully.', id: inquiry.id });
});

// --- API: list received inquiries (internal/admin use) ---
// Protected: requires the ADMIN_KEY header/query when configured; otherwise only
// loopback (localhost) requests are allowed so production deploys never leak
// visitor contact data publicly.
app.get('/api/inquiries', (req, res) => {
    if (ADMIN_KEY) {
        const provided = req.get('x-admin-key') || req.query.key;
        if (provided !== ADMIN_KEY) {
            return res.status(401).json({ ok: false, error: 'Unauthorized. Provide a valid admin key.' });
        }
    } else if (!isLoopback(req)) {
        return res.status(401).json({
            ok: false,
            error: 'Unauthorized. Set the ADMIN_KEY environment variable to expose this endpoint remotely.'
        });
    }
    res.json(readJson(INQUIRIES_FILE, []));
});

// 404 fallback for unknown API routes
app.use('/api', (req, res) => {
    res.status(404).json({ ok: false, error: 'Resource not found.' });
});

// 404 fallback for unknown non-API routes: serve the styled 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(PUBLIC_DIR, '404.html'));
});

app.listen(PORT, () => {
    console.log(`AuraDesign Studio running at http://localhost:${PORT}`);
});

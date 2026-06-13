const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

app.use(express.json());
app.use(express.static(PUBLIC_DIR));

function readJson(file, fallback) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
        return fallback;
    }
}

// --- API: proyectos del portafolio ---
app.get('/api/projects', (req, res) => {
    const projects = readJson(PROJECTS_FILE, []);
    const { category } = req.query;
    if (category && category !== 'all') {
        return res.json(projects.filter(p => p.categories.includes(category)));
    }
    res.json(projects);
});

// --- API: formulario de contacto ---
app.post('/api/contact', (req, res) => {
    const { firstName, lastName, email, inquiryType, message } = req.body || {};

    const errors = [];
    if (!firstName || !firstName.trim()) errors.push('El nombre es obligatorio.');
    if (!lastName || !lastName.trim()) errors.push('El apellido es obligatorio.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('El correo no es válido.');
    if (!message || !message.trim()) errors.push('El mensaje es obligatorio.');

    if (errors.length) {
        return res.status(400).json({ ok: false, errors });
    }

    const inquiries = readJson(INQUIRIES_FILE, []);
    const inquiry = {
        id: inquiries.length + 1,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        inquiryType: (inquiryType || 'Sin especificar').trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString()
    };
    inquiries.push(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf8');

    res.status(201).json({ ok: true, message: 'Consulta recibida correctamente.', id: inquiry.id });
});

// --- API: listar consultas recibidas (uso interno/admin) ---
app.get('/api/inquiries', (req, res) => {
    res.json(readJson(INQUIRIES_FILE, []));
});

// Fallback 404 para rutas de API desconocidas
app.use('/api', (req, res) => {
    res.status(404).json({ ok: false, error: 'Recurso no encontrado.' });
});

app.listen(PORT, () => {
    console.log(`AuraDesign Studio corriendo en http://localhost:${PORT}`);
});

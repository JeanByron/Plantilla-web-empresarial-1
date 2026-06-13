// Shared site logic: mobile menu, dynamic portfolio, contact form, and futuristic
// effects (wave dot-field background, cursor glow, light-up cards with 3D tilt,
// magnetic buttons, and scroll reveals).

// ---------- Internationalization (i18n) ----------
// English is the base language; Spanish is kept as a second locale. Switch the
// active language by changing LOCALE ('en' or 'es'). All user-facing runtime
// strings live here so they never appear hardcoded across the file.
const I18N = {
    en: {
        projectsLoadError: 'Could not load projects. Make sure the server is running.',
        viewCaseStudy: 'View case study',
        kpiVisitsNote: (delta) => `${delta >= 0 ? '+' : ''}${delta}% vs previous period`,
        kpiProjectsNote: 'published in the portfolio',
        kpiInquiriesNote: 'from the contact form',
        kpiConversionNote: (total) => `of ${total} visits`,
        donutCenterLabel: 'projects',
        donutCats: { web: 'Web Design', dev: 'Development', branding: 'Branding' },
        chartTooltip: (visits, date) => `${visits} visits · ${date}`,
        inquiriesEmpty: 'No inquiries recorded yet. Those arriving from the contact form will appear here.',
        tableName: 'Name',
        tableEmail: 'Email',
        tableType: 'Type',
        tableDate: 'Date',
        inquiryTypeFallback: '—',
        formSending: 'Sending...',
        formSubmit: 'Send inquiry',
        formSuccess: 'Thank you. Your inquiry was sent successfully; we will be in touch soon.',
        formGenericError: 'An error occurred while submitting the form.',
        formConnectionError: 'Could not connect to the server. Please try again.'
    },
    es: {
        projectsLoadError: 'No se pudieron cargar los proyectos. Verifica que el servidor esté en ejecución.',
        viewCaseStudy: 'Ver caso de estudio',
        kpiVisitsNote: (delta) => `${delta >= 0 ? '+' : ''}${delta}% vs periodo anterior`,
        kpiProjectsNote: 'publicados en el portafolio',
        kpiInquiriesNote: 'desde el formulario de contacto',
        kpiConversionNote: (total) => `sobre ${total} visitas`,
        donutCenterLabel: 'proyectos',
        donutCats: { web: 'Diseño Web', dev: 'Desarrollo', branding: 'Branding' },
        chartTooltip: (visits, date) => `${visits} visitas · ${date}`,
        inquiriesEmpty: 'Aún no hay consultas registradas. Las que lleguen desde el formulario de contacto aparecerán aquí.',
        tableName: 'Nombre',
        tableEmail: 'Correo',
        tableType: 'Tipo',
        tableDate: 'Fecha',
        inquiryTypeFallback: '—',
        formSending: 'Enviando...',
        formSubmit: 'Enviar consulta',
        formSuccess: 'Gracias. Tu consulta fue enviada correctamente; te contactaremos pronto.',
        formGenericError: 'Ocurrió un error al enviar el formulario.',
        formConnectionError: 'No se pudo conectar con el servidor. Inténtalo de nuevo.'
    }
};

// Active language and matching number/date locale tag.
const LOCALE = 'en';
const T = I18N[LOCALE];
const INTL_LOCALE = LOCALE === 'es' ? 'es-CO' : 'en-US';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

// Mouse position shared across pages: stored on navigation so the light effects
// start instantly right where the cursor is.
function loadStoredPointer() {
    try {
        const stored = JSON.parse(sessionStorage.getItem('pointer-pos'));
        if (stored && Number.isFinite(stored.x) && Number.isFinite(stored.y)) return stored;
    } catch { /* sessionStorage unavailable */ }
    return null;
}

function storePointer(x, y) {
    try {
        sessionStorage.setItem('pointer-pos', JSON.stringify({ x, y }));
    } catch { /* sessionStorage unavailable */ }
}

document.addEventListener('DOMContentLoaded', () => {
    // Reveals the content once the styles are ready (anti-flash)
    requestAnimationFrame(() => {
        document.documentElement.classList.add('app-ready');
    });
    setActiveNav();
    initRouter();
    initMobileMenu();
    initPortfolio();
    initContactForm();
    initDashboard();
    initDotField();
    initCursorGlow();
    initGlowCards();
    initButtonEffects();
    initFieldGlow();
    initNavGlow();
    initLogoGlow();
    initReveals();
});

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden-menu');
        const icon = toggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = menu.classList.contains('hidden-menu') ? 'menu' : 'close';
    });
}

/* ---------- Active menu state based on the current view ---------- */
function currentPage() {
    const page = location.pathname.split('/').pop();
    return page === '' ? 'index.html' : page;
}

function setActiveNav() {
    const page = currentPage();
    document.querySelectorAll('header a[data-nav]').forEach(link => {
        const active = link.dataset.nav === page;
        link.classList.toggle('text-secondary', active);
        link.classList.toggle('font-bold', active);
        link.classList.toggle('text-on-surface-variant', !active);
        // The fixed underline only applies to the desktop menu
        if (link.closest('#main-nav')) {
            link.classList.toggle('border-b-2', active);
            link.classList.toggle('border-secondary', active);
        }
    });
    // The logo expands when the active view is Home
    document.querySelectorAll('header a[href="index.html"]').forEach(logo => {
        logo.classList.toggle('logo-expanded', page === 'index.html');
    });
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu || menu.classList.contains('hidden-menu')) return;
    menu.classList.add('hidden-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    const icon = toggle && toggle.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = 'menu';
}

/* ---------- Smooth navigation between views ----------
   Internal links don't reload the page: only the <main> is swapped.
   The header, footer, and animated background persist between views. */
function initRouter() {
    document.addEventListener('click', (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const link = e.target.closest('a');
        if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        const url = new URL(link.href);
        if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
        e.preventDefault();
        navigateTo(url, true);
    });

    window.addEventListener('popstate', () => navigateTo(new URL(location.href), false));
}

let navigating = false;

async function navigateTo(url, push) {
    closeMobileMenu();

    // Same view: just scroll (to the anchor or to the very top)
    if (url.pathname === location.pathname) {
        if (push && url.href !== location.href) history.pushState({}, '', url.href);
        if (url.hash) scrollToHash(url.hash);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (navigating) return;
    navigating = true;

    try {
        const res = await fetch(url.pathname);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
        const newMain = doc.querySelector('main');
        const oldMain = document.querySelector('main');
        if (!newMain || !oldMain) throw new Error('unexpected structure');

        await fadeOutMain(oldMain);

        document.title = doc.title;
        oldMain.replaceWith(newMain);
        if (push) history.pushState({}, '', url.href);
        setActiveNav();

        // Initialize only what was just inserted: the persistent ones have guards
        initPortfolio();
        initContactForm();
        initDashboard();
        initButtonEffects();
        initReveals();

        window.scrollTo({ top: 0, behavior: 'instant' });
        if (url.hash) scrollToHash(url.hash);
        fadeInMain(newMain);
    } catch {
        // On any problem, fall back to traditional navigation
        location.href = url.href;
    } finally {
        navigating = false;
    }
}

function fadeOutMain(el) {
    if (REDUCED_MOTION) return Promise.resolve();
    el.classList.add('view-leave');
    return new Promise(resolve => setTimeout(resolve, 180));
}

function fadeInMain(el) {
    if (REDUCED_MOTION) return;
    el.classList.add('view-enter');
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('view-enter')));
}

function scrollToHash(hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
}

/* ---------- Animated background: wave dot mesh reactive to the mouse ---------- */
function initDotField() {
    if (REDUCED_MOTION) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'dot-field';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    const SPACING = 30;
    const MOUSE_RADIUS = 210;
    let width, height, dots = [];

    // Starts where the cursor was on the previous page
    const stored = loadStoredPointer();
    const pointer = stored
        ? { x: stored.x, y: stored.y, tx: stored.x, ty: stored.y, active: true }
        : { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    // Light intensity (drops to 0 when leaving the window or entering the map)
    let influence = pointer.active ? 1 : 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        dots = [];
        for (let x = 0; x <= width + SPACING; x += SPACING) {
            for (let y = 0; y <= height + SPACING; y += SPACING) {
                dots.push({ x, y });
            }
        }
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('pointermove', (e) => {
        pointer.tx = e.clientX;
        pointer.ty = e.clientY;
        // Over the map the light fades just like when leaving the window
        pointer.active = !(e.target.closest && e.target.closest('.map-dark'));
    });
    // The map iframe doesn't emit pointermove: entry is detected here
    document.addEventListener('pointerover', (e) => {
        if (e.target.closest && e.target.closest('.map-dark')) pointer.active = false;
    });
    document.addEventListener('pointerleave', () => {
        pointer.active = false;
    });
    window.addEventListener('pagehide', () => {
        if (pointer.tx > -9999) storePointer(pointer.tx, pointer.ty);
    });

    let t = 0;
    (function frame() {
        t += 0.016;
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
        // Quick fade-in, soft fade-out
        influence += ((pointer.active ? 1 : 0) - influence) * (pointer.active ? 0.3 : 0.06);

        ctx.clearRect(0, 0, width, height);

        for (const d of dots) {
            const wave =
                Math.sin(d.x * 0.012 + t * 1.2) * 0.5 +
                Math.sin(d.y * 0.010 - t * 0.8) * 0.5 +
                Math.sin((d.x + d.y) * 0.008 + t * 0.5) * 0.5;

            let alpha = 0.06 + ((wave + 1.5) / 3) * 0.12;
            let radius = 0.9 + ((wave + 1.5) / 3) * 1.1;
            let ox = 0;
            let oy = Math.sin(d.x * 0.01 + t) * 3;

            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_RADIUS && influence > 0.01) {
                const force = (1 - dist / MOUSE_RADIUS) * influence;
                alpha += force * 0.7;
                radius += force * 2.2;
                if (dist > 0.01) {
                    ox += (dx / dist) * force * 12;
                    oy += (dy / dist) * force * 12;
                }
            }

            const hue = 202 + wave * 12;
            ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(d.x + ox, d.y + oy, radius, 0, 6.2832);
            ctx.fill();
        }

        requestAnimationFrame(frame);
    })();
}

/* ---------- Light glow that follows the cursor ---------- */
function initCursorGlow() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    // Starts where the cursor was on the previous page
    const stored = loadStoredPointer();
    if (stored) {
        glow.style.transform = `translate(${stored.x}px, ${stored.y}px)`;
    } else {
        glow.style.opacity = '0';
    }

    window.addEventListener('pointermove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        // Over the map the glow also fades, like when leaving the window
        glow.style.opacity = (e.target.closest && e.target.closest('.map-dark')) ? '0' : '1';
    });
    document.addEventListener('pointerover', (e) => {
        if (e.target.closest && e.target.closest('.map-dark')) glow.style.opacity = '0';
    });
    // When leaving the window, the glow fades out in place
    document.addEventListener('pointerleave', () => {
        glow.style.opacity = '0';
    });
}

/* ---------- Cards: lit zone under the mouse + 3D tilt ---------- */
function initGlowCards() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    // Delegation: also works with dynamically created cards (portfolio)
    document.addEventListener('pointermove', (e) => {
        const card = e.target.closest ? e.target.closest('.glow-card') : null;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        card.style.setProperty('--mx', `${mx}px`);
        card.style.setProperty('--my', `${my}px`);

        const rx = -((my / rect.height) - 0.5) * 4;
        const ry = ((mx / rect.width) - 0.5) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    document.addEventListener('pointerout', (e) => {
        const card = e.target.closest ? e.target.closest('.glow-card') : null;
        if (card && !card.contains(e.relatedTarget)) {
            card.style.transform = '';
        }
    });
}

/* ---------- Form fields: light that follows the cursor ---------- */
function initFieldGlow() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    // Delegation: also covers fields inserted after a smooth navigation
    document.addEventListener('pointermove', (e) => {
        const field = e.target.closest && e.target.closest('.field-glow');
        if (!field) return;
        const r = field.getBoundingClientRect();
        field.style.setProperty('--mx', `${e.clientX - r.left}px`);
        field.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
}

/* ---------- Buttons: magnetism, light under the cursor, and ripple on press ---------- */
function initButtonEffects() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    // Underlined links (border-b-2) are text, not buttons: no effects
    const els = document.querySelectorAll(
        'a[class*="bg-primary"], button[class*="bg-primary"], ' +
        'a[class*="border-primary"]:not([class*="border-b-2"]), ' +
        'button[class*="border-primary"]:not([class*="border-b-2"]), ' +
        'button[type="submit"], .filter-btn'
    );

    els.forEach(el => {
        // Avoids duplicating listeners after smooth navigation
        if (el.dataset.fxBound) return;
        el.dataset.fxBound = '1';
        el.classList.add('magnetic', 'btn-glow');
        // Inverted-color variant for light-background buttons
        if (el.className.includes('bg-primary')) {
            el.classList.add('btn-glow-dark');
        }
        let pressed = false;

        const applyTransform = (dx, dy) => {
            el.style.transform = `translate(${dx * 0.14}px, ${dy * 0.22}px) scale(${pressed ? 0.96 : 1})`;
        };

        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            // Magnetism toward the cursor
            applyTransform(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            // Inner light following the mouse tip
            el.style.setProperty('--mx', `${e.clientX - r.left}px`);
            el.style.setProperty('--my', `${e.clientY - r.top}px`);
        });

        el.addEventListener('pointerdown', (e) => {
            pressed = true;
            const r = el.getBoundingClientRect();
            applyTransform(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            spawnRipple(el, e, r);
            // Restarts the color pulse even on repeated presses
            el.classList.remove('btn-pulse');
            void el.offsetWidth;
            el.classList.add('btn-pulse');
        });

        const release = () => {
            pressed = false;
            el.style.transform = '';
        };
        el.addEventListener('pointerup', release);
        el.addEventListener('pointerleave', release);
    });
}

// Color ripple that expands from the exact click point
function spawnRipple(el, e, rect) {
    const size = Math.max(rect.width, rect.height) * 2.2;
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}

/* ---------- Logo: negative lighting limited to the letters ---------- */
function initLogoGlow() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

    document.querySelectorAll('header a[href="index.html"]').forEach(logo => {
        logo.classList.add('logo-glow');
        // The ::after draws an exact copy of the text from this attribute
        logo.dataset.text = logo.textContent.trim();
        logo.addEventListener('pointermove', (e) => {
            const r = logo.getBoundingClientRect();
            logo.style.setProperty('--mx', `${e.clientX - r.left}px`);
            logo.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });
}

/* ---------- Menu: boxes with a bottom light that follows the cursor ---------- */
function initNavGlow() {
    const links = document.querySelectorAll('header nav a');
    links.forEach(link => {
        link.classList.add('nav-box');
        if (REDUCED_MOTION || !FINE_POINTER) return;
        link.addEventListener('pointermove', (e) => {
            const r = link.getBoundingClientRect();
            link.style.setProperty('--mx', `${e.clientX - r.left}px`);
        });
    });
}

/* ---------- Smooth reveal of sections on scroll ---------- */
function initReveals() {
    if (REDUCED_MOTION) return;

    const targets = document.querySelectorAll('main section, main article');
    if (!targets.length) return;

    document.body.classList.add('js-ready');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    targets.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ---------- Dynamic portfolio (portfolio.html) ---------- */
async function initPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    let projects = [];
    try {
        const res = await fetch('/api/projects');
        projects = await res.json();
    } catch {
        grid.innerHTML = `<p class="font-body-md text-body-md text-error col-span-full">${T.projectsLoadError}</p>`;
        return;
    }

    renderProjects(grid, projects);

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-surface-container', 'text-on-surface-variant');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

            const filter = btn.getAttribute('data-filter');
            const visible = filter === 'all'
                ? projects
                : projects.filter(p => p.categories.includes(filter));
            renderProjects(grid, visible);
        });
    });
}

function renderProjects(grid, projects) {
    // The image is the background of the whole card; a spacer defines the height
    // and the text strip (project-caption) fades out on hover.
    grid.innerHTML = projects.map(p => `
        <div class="project-card glow-card relative group flex flex-col bg-surface-container-lowest border border-surface-variant shadow-ambient-1 shadow-ambient-2 overflow-hidden transition-all duration-200 ease-out cursor-pointer ${p.wide ? 'md:col-span-2 lg:col-span-2' : ''}">
            <img alt="${escapeHtml(p.imageAlt)}" class="absolute inset-0 w-full h-full object-cover" src="${p.image}"/>
            <div class="w-full grow ${p.wide ? 'aspect-video' : 'aspect-[4/3]'}"></div>
            <div class="project-caption p-6">
                <div class="text-secondary font-label-md text-label-md uppercase tracking-wider mb-2">${escapeHtml(p.label)}</div>
                <h3 class="font-headline-md text-headline-md text-primary mb-2">${escapeHtml(p.title)}</h3>
            </div>
            <div class="overlay absolute inset-0 bg-primary/90 flex flex-col justify-end p-6">
                <h3 class="font-headline-md text-headline-md text-on-surface mb-2">${escapeHtml(p.title)}</h3>
                <p class="font-body-md text-body-md text-on-surface-variant mb-4 ${p.wide ? 'max-w-2xl' : ''}">${escapeHtml(p.description)}</p>
                <span class="text-secondary-fixed-dim font-label-md text-label-md uppercase tracking-wider flex items-center gap-2">
                    Ver caso de estudio <span class="material-symbols-outlined">arrow_forward</span>
                </span>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

/* ---------- Dashboard (dashboard.html) ---------- */
let dashState = null;
let dashLineAnim = 0;
let dashResizeBound = false;

async function initDashboard() {
    const root = document.getElementById('dashboard-root');
    if (!root || root.dataset.init) return;
    root.dataset.init = '1';

    let projects = [];
    let inquiries = [];
    try {
        [projects, inquiries] = await Promise.all([
            fetch('/api/projects').then(r => r.json()),
            fetch('/api/inquiries').then(r => r.json())
        ]);
    } catch { /* el dashboard se renderiza igualmente con datos vacíos */ }

    dashState = { range: 7, projects, inquiries, visits: buildVisitSeries(180) };

    renderDashboard();
    renderInquiriesTable(inquiries);
    animateSystemBars(root);

    // Selector de rango (7 / 30 / 90 días)
    root.querySelectorAll('[data-range]').forEach(btn => {
        btn.addEventListener('click', () => {
            root.querySelectorAll('[data-range]').forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-surface-container', 'text-on-surface-variant');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
            dashState.range = parseInt(btn.dataset.range, 10);
            renderDashboard();
        });
    });

    if (!dashResizeBound) {
        dashResizeBound = true;
        window.addEventListener('resize', () => {
            if (dashState && document.getElementById('dash-line')) renderCharts();
        });
    }
}

// Serie de visitas determinista (estable entre cargas, sin aleatoriedad)
function buildVisitSeries(days) {
    const out = [];
    for (let i = 0; i < days; i++) {
        const weekly = Math.sin((i % 7) / 7 * Math.PI * 2) * 110;
        const trend = i * 2.6;
        const wave = Math.sin(i * 0.31) * 85 + Math.sin(i * 0.07) * 140;
        out.push(Math.max(120, Math.round(640 + trend + weekly + wave)));
    }
    return out;
}

function renderDashboard() {
    renderKpis();
    renderCharts();
}

function renderCharts() {
    drawLineChart();
    drawDonut();
}

function renderKpis() {
    const { range, projects, inquiries, visits } = dashState;
    const sum = arr => arr.reduce((a, b) => a + b, 0);
    const slice = visits.slice(-range);
    const prev = visits.slice(-range * 2, -range);
    const total = sum(slice);
    const delta = prev.length ? Math.round((total - sum(prev)) / sum(prev) * 100) : 0;
    const conversion = total ? Math.min(100, (inquiries.length + 14) / total * 100) : 0;

    setKpi('visits', total, `${delta >= 0 ? '+' : ''}${delta}% vs periodo anterior`, delta >= 0);
    setKpi('projects', projects.length, 'publicados en el portafolio', true);
    setKpi('inquiries', inquiries.length, 'desde el formulario de contacto', true);
    setKpi('conversion', conversion, `sobre ${total.toLocaleString('es-CO')} visitas`, true);
}

function setKpi(key, value, note, positive) {
    const el = document.querySelector(`[data-kpi="${key}"]`);
    if (!el) return;
    const noteEl = document.querySelector(`[data-kpi-note="${key}"]`);
    if (noteEl) {
        noteEl.textContent = note;
        noteEl.classList.toggle('text-secondary-fixed-dim', positive);
        noteEl.classList.toggle('text-error', !positive);
    }

    const decimals = key === 'conversion' ? 1 : 0;
    const suffix = key === 'conversion' ? '%' : '';
    const format = n => n.toLocaleString('es-CO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    if (REDUCED_MOTION) {
        el.textContent = format(value);
        el.dataset.value = value;
        return;
    }
    // Conteo animado desde el valor anterior
    const start = parseFloat(el.dataset.value || '0');
    el.dataset.value = value;
    const t0 = performance.now();
    (function tick(now) {
        const p = Math.min(1, (now - t0) / 800);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = format(start + (value - start) * eased);
        if (p < 1 && el.isConnected) requestAnimationFrame(tick);
    })(t0);
}

function drawLineChart() {
    const canvas = document.getElementById('dash-line');
    if (!canvas || !dashState) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const data = dashState.visits.slice(-dashState.range);
    const max = Math.max(...data) * 1.12;
    const min = Math.min(...data) * 0.85;
    const padL = 48, padR = 12, padT = 12, padB = 10;
    const iw = w - padL - padR;
    const ih = h - padT - padB;
    const px = i => padL + iw * (i / Math.max(1, data.length - 1));
    const py = v => padT + ih * (1 - (v - min) / (max - min));

    cancelAnimationFrame(dashLineAnim);
    const t0 = performance.now();
    const dur = REDUCED_MOTION ? 0 : 700;

    function frame(now) {
        const p = dur ? Math.min(1, (now - t0) / dur) : 1;
        const eased = 1 - Math.pow(1 - p, 3);
        ctx.clearRect(0, 0, w, h);

        // Rejilla y etiquetas del eje Y
        ctx.font = '11px Inter, sans-serif';
        const steps = 4;
        for (let s = 0; s <= steps; s++) {
            const y = padT + ih * (s / steps);
            ctx.strokeStyle = 'rgba(88, 196, 255, 0.08)';
            ctx.beginPath();
            ctx.moveTo(padL, y);
            ctx.lineTo(w - padR, y);
            ctx.stroke();
            ctx.fillStyle = '#9fb2d1';
            ctx.fillText(Math.round(max - (max - min) * (s / steps)).toLocaleString('es-CO'), 4, y + 4);
        }

        const count = Math.max(2, Math.ceil(data.length * eased));

        // Área bajo la curva
        const grad = ctx.createLinearGradient(0, padT, 0, h - padB);
        grad.addColorStop(0, 'rgba(88, 196, 255, 0.26)');
        grad.addColorStop(1, 'rgba(88, 196, 255, 0)');
        ctx.beginPath();
        ctx.moveTo(px(0), py(data[0]));
        for (let i = 1; i < count; i++) ctx.lineTo(px(i), py(data[i]));
        ctx.lineTo(px(count - 1), h - padB);
        ctx.lineTo(px(0), h - padB);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Línea con resplandor cian
        ctx.beginPath();
        ctx.moveTo(px(0), py(data[0]));
        for (let i = 1; i < count; i++) ctx.lineTo(px(i), py(data[i]));
        ctx.strokeStyle = '#58c4ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(88, 196, 255, 0.6)';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (p < 1) dashLineAnim = requestAnimationFrame(frame);
    }
    dashLineAnim = requestAnimationFrame(frame);

    bindLineHover(canvas, data, px, py);
}

function bindLineHover(canvas, data, px, py) {
    const wrap = canvas.parentElement;
    let tip = wrap.querySelector('.dash-tooltip');
    if (!tip) {
        tip = document.createElement('div');
        tip.className = 'dash-tooltip';
        wrap.appendChild(tip);
    }
    // Asignación directa: cada re-render reemplaza el manejador anterior
    canvas.onpointermove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < data.length; i++) {
            const d = Math.abs(px(i) - x);
            if (d < bestDist) { bestDist = d; best = i; }
        }
        const date = new Date();
        date.setDate(date.getDate() - (data.length - 1 - best));
        tip.textContent = `${data[best].toLocaleString('es-CO')} visitas · ${date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}`;
        tip.style.left = `${canvas.offsetLeft + px(best)}px`;
        tip.style.top = `${canvas.offsetTop + py(data[best])}px`;
        tip.style.opacity = '1';
    };
    canvas.onpointerleave = () => { tip.style.opacity = '0'; };
}

function drawDonut() {
    const canvas = document.getElementById('dash-donut');
    if (!canvas || !dashState) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const cats = [
        { key: 'web', label: 'Diseño Web', color: '#58c4ff' },
        { key: 'dev', label: 'Desarrollo', color: '#316bf3' },
        { key: 'branding', label: 'Branding', color: '#8fd4ff' }
    ];
    const counts = cats.map(c => dashState.projects.filter(p => p.categories && p.categories.includes(c.key)).length);
    const total = counts.reduce((a, b) => a + b, 0) || 1;

    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) / 2 - 10;
    const inner = r * 0.62;

    ctx.clearRect(0, 0, w, h);
    let a0 = -Math.PI / 2;
    counts.forEach((n, i) => {
        if (!n) return;
        const a1 = a0 + (n / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, a0 + 0.03, a1 - 0.03);
        ctx.arc(cx, cy, inner, a1 - 0.03, a0 + 0.03, true);
        ctx.closePath();
        ctx.fillStyle = cats[i].color;
        ctx.shadowColor = cats[i].color + '66';
        ctx.shadowBlur = 12;
        ctx.fill();
        a0 = a1;
    });
    ctx.shadowBlur = 0;

    // Total en el centro
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e6eefb';
    ctx.font = '700 26px Inter, sans-serif';
    ctx.fillText(String(dashState.projects.length), cx, cy + 4);
    ctx.fillStyle = '#9fb2d1';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText('proyectos', cx, cy + 20);

    const legend = document.getElementById('dash-donut-legend');
    if (legend) {
        legend.innerHTML = cats.map((c, i) => `
            <li class="flex items-center justify-between gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <span class="flex items-center gap-2"><span class="inline-block w-2.5 h-2.5 rounded-full" style="background:${c.color}; box-shadow:0 0 8px ${c.color}99"></span>${c.label}</span>
                <span class="text-on-surface font-bold">${counts[i]}</span>
            </li>`).join('');
    }
}

function renderInquiriesTable(inquiries) {
    const wrap = document.getElementById('dash-inquiries');
    if (!wrap) return;

    if (!inquiries.length) {
        wrap.innerHTML = '<p class="font-body-md text-body-md text-on-surface-variant py-stack-sm">Aún no hay consultas registradas. Las que lleguen desde el formulario de contacto aparecerán aquí.</p>';
        return;
    }

    const rows = inquiries.slice(-6).reverse().map(q => `
        <tr class="border-b border-outline-variant/40 hover:bg-surface-container-low transition-colors duration-200">
            <td class="py-3 pr-4 font-body-sm text-body-sm text-on-surface whitespace-nowrap">${escapeHtml(q.firstName)} ${escapeHtml(q.lastName)}</td>
            <td class="py-3 pr-4 font-body-sm text-body-sm text-secondary-fixed-dim">${escapeHtml(q.email)}</td>
            <td class="py-3 pr-4 font-body-sm text-body-sm text-on-surface-variant">${escapeHtml(q.inquiryType || '—')}</td>
            <td class="py-3 font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">${new Date(q.receivedAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</td>
        </tr>`).join('');

    wrap.innerHTML = `
        <div class="overflow-x-auto">
        <table class="w-full text-left">
        <thead><tr class="border-b border-outline-variant">
            <th class="py-2 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">Nombre</th>
            <th class="py-2 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">Correo</th>
            <th class="py-2 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">Tipo</th>
            <th class="py-2 font-label-md text-label-md text-on-surface-variant uppercase">Fecha</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        </table>
        </div>`;
}

function animateSystemBars(root) {
    root.querySelectorAll('.dash-bar-fill').forEach(bar => {
        const target = bar.dataset.target || '0';
        if (REDUCED_MOTION) {
            bar.style.width = `${target}%`;
            return;
        }
        requestAnimationFrame(() => requestAnimationFrame(() => {
            bar.style.width = `${target}%`;
        }));
    });
}

/* ---------- Formulario de contacto (about.html) ---------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';

    // Luz bajo el cursor en los campos, como en los botones
    form.querySelectorAll('input, select, textarea').forEach(el => el.classList.add('field-glow'));

    const feedback = document.getElementById('form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        const payload = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            inquiryType: form.inquiryType.value,
            message: form.message.value
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();

            if (res.ok && data.ok) {
                showFeedback(feedback, 'Gracias. Tu consulta fue enviada correctamente; te contactaremos pronto.', true);
                form.reset();
            } else {
                showFeedback(feedback, (data.errors || ['Ocurrió un error al enviar el formulario.']).join(' '), false);
            }
        } catch {
            showFeedback(feedback, 'No se pudo conectar con el servidor. Inténtalo de nuevo.', false);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar consulta';
        }
    });
}

function showFeedback(el, message, success) {
    el.textContent = message;
    el.classList.remove('hidden', 'bg-error-container', 'text-on-error-container', 'bg-secondary-fixed', 'text-on-secondary-fixed');
    el.classList.add(...(success
        ? ['bg-secondary-fixed', 'text-on-secondary-fixed']
        : ['bg-error-container', 'text-on-error-container']));
}

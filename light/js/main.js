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
        formConnectionError: 'Could not connect to the server. Please try again.',
        demoDataNote: 'Demo data',
        projectNotFoundTitle: 'Project not found',
        projectNotFoundBody: "The case study you are looking for doesn't exist or has been moved.",
        backToPortfolio: 'Back to portfolio',
        startProjectCta: 'Start a project',
        caseStudyBlocks: (p) => [
            { heading: 'The Challenge', body: `${p.title} needed a digital presence that matched its ambition. We mapped the core problem, audited the existing experience, and defined the outcomes that mattered most for the ${p.label.toLowerCase()} brief.` },
            { heading: 'Our Approach', body: `We designed and built an end-to-end solution—from concept and visual system to a performant, accessible front end—iterating closely with the team to keep the work sharp and on-brand.` },
            { heading: 'The Results', body: `The launch delivered a faster, clearer, and more memorable experience. ${p.title} now has a foundation built to scale with the business.` }
        ]
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
        formConnectionError: 'No se pudo conectar con el servidor. Inténtalo de nuevo.',
        demoDataNote: 'Datos de demostración',
        projectNotFoundTitle: 'Proyecto no encontrado',
        projectNotFoundBody: 'El caso de estudio que buscas no existe o fue movido.',
        backToPortfolio: 'Volver al portafolio',
        startProjectCta: 'Inicia un proyecto',
        caseStudyBlocks: (p) => [
            { heading: 'El reto', body: `${p.title} necesitaba una presencia digital a la altura de su ambición. Mapeamos el problema central, auditamos la experiencia existente y definimos los resultados más importantes para el proyecto de ${p.label.toLowerCase()}.` },
            { heading: 'Nuestro enfoque', body: `Diseñamos y construimos una solución integral —del concepto y el sistema visual a un front end accesible y de alto rendimiento—, iterando junto al equipo para mantener el trabajo afinado y fiel a la marca.` },
            { heading: 'Los resultados', body: `El lanzamiento entregó una experiencia más rápida, clara y memorable. ${p.title} cuenta ahora con una base lista para escalar con el negocio.` }
        ]
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
    requestAnimationFrame(() => {
        document.documentElement.classList.add('app-ready');
    });
    setActiveNav();
    setCopyrightYear();
    initRouter();
    initMobileMenu();
    initPortfolio();
    initContactForm();
    initDashboard();
    initProjectDetail();
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
        const open = !menu.classList.contains('hidden-menu');
        toggle.setAttribute('aria-expanded', String(open));
        const icon = toggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = open ? 'close' : 'menu';
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
        if (link.closest('#main-nav')) {
            link.classList.toggle('border-b-2', active);
            link.classList.toggle('border-secondary', active);
        }
    });
    document.querySelectorAll('header a[href="index.html"]').forEach(logo => {
        logo.classList.toggle('logo-expanded', page === 'index.html');
    });
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu || menu.classList.contains('hidden-menu')) return;
    menu.classList.add('hidden-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
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

        setCopyrightYear();
        initPortfolio();
        initContactForm();
        initDashboard();
        initProjectDetail();
        initButtonEffects();
        initReveals();

        window.scrollTo({ top: 0, behavior: 'instant' });
        if (url.hash) scrollToHash(url.hash);
        fadeInMain(newMain);
    } catch {
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

    const stored = loadStoredPointer();
    const pointer = stored
        ? { x: stored.x, y: stored.y, tx: stored.x, ty: stored.y, active: true }
        : { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
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
        pointer.active = !(e.target.closest && e.target.closest('.map-dark'));
    });
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

    const stored = loadStoredPointer();
    if (stored) {
        glow.style.transform = `translate(${stored.x}px, ${stored.y}px)`;
    } else {
        glow.style.opacity = '0';
    }

    window.addEventListener('pointermove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        glow.style.opacity = (e.target.closest && e.target.closest('.map-dark')) ? '0' : '1';
    });
    document.addEventListener('pointerover', (e) => {
        if (e.target.closest && e.target.closest('.map-dark')) glow.style.opacity = '0';
    });
    document.addEventListener('pointerleave', () => {
        glow.style.opacity = '0';
    });
}

/* ---------- Cards: lit zone under the mouse + 3D tilt ---------- */
function initGlowCards() {
    if (REDUCED_MOTION || !FINE_POINTER) return;

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

    const els = document.querySelectorAll(
        'a[class*="bg-primary"], button[class*="bg-primary"], ' +
        'a[class*="border-primary"]:not([class*="border-b-2"]), ' +
        'button[class*="border-primary"]:not([class*="border-b-2"]), ' +
        'button[type="submit"], .filter-btn'
    );

    els.forEach(el => {
        if (el.dataset.fxBound) return;
        el.dataset.fxBound = '1';
        el.classList.add('magnetic', 'btn-glow');
        if (el.className.includes('bg-primary')) {
            el.classList.add('btn-glow-dark');
        }
        let pressed = false;

        const applyTransform = (dx, dy) => {
            el.style.transform = `translate(${dx * 0.14}px, ${dy * 0.22}px) scale(${pressed ? 0.96 : 1})`;
        };

        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            applyTransform(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            el.style.setProperty('--mx', `${e.clientX - r.left}px`);
            el.style.setProperty('--my', `${e.clientY - r.top}px`);
        });

        el.addEventListener('pointerdown', (e) => {
            pressed = true;
            const r = el.getBoundingClientRect();
            applyTransform(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
            spawnRipple(el, e, r);
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

/* ---------- Dual-mode project loading ----------
   Tries the Express API first (full-stack deployments); on any failure
   falls back to the bundled window.PROJECTS_FALLBACK (static deployments). */
async function loadProjects() {
    const cfg = window.SITE_CONFIG || {};
    try {
        const res = await fetch((cfg.apiBase || '') + '/api/projects');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length) return data;
        throw new Error('empty');
    } catch {
        return Array.isArray(window.PROJECTS_FALLBACK) ? window.PROJECTS_FALLBACK : [];
    }
}

/* ---------- Dynamic portfolio (portfolio.html) ---------- */
async function initPortfolio() {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    const projects = await loadProjects();
    if (!projects.length) {
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
    grid.innerHTML = projects.map(p => `
        <a href="https://your-gumroad.gumroad.com/l/auradesign-studio" target="_blank" rel="noopener" aria-label="${escapeHtml(p.title)} — ${T.viewCaseStudy}" class="project-card glow-card relative group flex flex-col bg-surface-container-lowest border border-surface-variant shadow-ambient-1 shadow-ambient-2 overflow-hidden transition-all duration-200 ease-out cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary ${p.wide ? 'md:col-span-2 lg:col-span-2' : ''}">
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
                    ${T.viewCaseStudy} <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </span>
            </div>
        </a>
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

    const cfg = window.SITE_CONFIG || {};
    const projects = await loadProjects();
    let inquiries = [];
    let demo = false;
    try {
        const headers = {};
        const key = (() => { try { return sessionStorage.getItem('admin-key'); } catch { return null; } })();
        if (key) headers['x-admin-key'] = key;
        const res = await fetch((cfg.apiBase || '') + '/api/inquiries', { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        inquiries = await res.json();
    } catch {
        // No backend (static deploy) or protected endpoint: show demo data so
        // the dashboard never looks empty or broken.
        inquiries = DEMO_INQUIRIES;
        demo = true;
    }

    dashState = { range: 7, projects, inquiries, visits: buildVisitSeries(180) };

    renderDashboard();
    renderInquiriesTable(inquiries);
    animateSystemBars(root);
    toggleDemoBadge(root, demo);

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

// Sample inquiries shown when no live backend is available, so the dashboard
// always demonstrates the feature. Dates are offsets from "today" at render time.
const DEMO_INQUIRIES = (() => {
    const now = Date.now();
    const day = 86400000;
    const seed = [
        { firstName: 'Olivia', lastName: 'Bennett', email: 'olivia.bennett@northpeak.io', inquiryType: 'Web Design', days: 1 },
        { firstName: 'Marcus', lastName: 'Lindqvist', email: 'm.lindqvist@studioform.se', inquiryType: 'Branding', days: 3 },
        { firstName: 'Aiko', lastName: 'Tanaka', email: 'aiko@meridianlabs.jp', inquiryType: 'Development', days: 5 },
        { firstName: 'Daniel', lastName: 'Okafor', email: 'daniel.okafor@vertexhq.com', inquiryType: 'Web Design', days: 8 },
        { firstName: 'Sofia', lastName: 'Marchetti', email: 'sofia@marchetti.design', inquiryType: 'Branding', days: 12 },
        { firstName: 'Liam', lastName: 'Connolly', email: 'liam.connolly@brightwave.co', inquiryType: 'Development', days: 16 },
        { firstName: 'Priya', lastName: 'Nair', email: 'priya.nair@lumastack.in', inquiryType: 'Web Design', days: 19 }
    ];
    return seed.map((s, i) => ({
        id: i + 1,
        firstName: s.firstName,
        lastName: s.lastName,
        email: s.email,
        inquiryType: s.inquiryType,
        message: 'Sample inquiry for demonstration.',
        receivedAt: new Date(now - s.days * day).toISOString()
    }));
})();

// Shows/hides the "Demo data" badge on the dashboard.
function toggleDemoBadge(root, demo) {
    let badge = root.querySelector('[data-demo-badge]');
    if (!demo) { if (badge) badge.remove(); return; }
    if (!badge) {
        badge = document.createElement('span');
        badge.dataset.demoBadge = '1';
        badge.className = 'inline-flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm';
        const heading = root.querySelector('h1, h2');
        if (heading) heading.insertAdjacentElement('afterend', badge);
        else root.prepend(badge);
    }
    badge.textContent = T.demoDataNote;
}

// Deterministic visit series (stable across loads, no randomness)
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

    setKpi('visits', total, T.kpiVisitsNote(delta), delta >= 0);
    setKpi('projects', projects.length, T.kpiProjectsNote, true);
    setKpi('inquiries', inquiries.length, T.kpiInquiriesNote, true);
    setKpi('conversion', conversion, T.kpiConversionNote(total.toLocaleString(INTL_LOCALE)), true);
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
    const format = n => n.toLocaleString(INTL_LOCALE, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    if (REDUCED_MOTION) {
        el.textContent = format(value);
        el.dataset.value = value;
        return;
    }
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
            ctx.fillText(Math.round(max - (max - min) * (s / steps)).toLocaleString(INTL_LOCALE), 4, y + 4);
        }

        const count = Math.max(2, Math.ceil(data.length * eased));

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
        tip.textContent = T.chartTooltip(
            data[best].toLocaleString(INTL_LOCALE),
            date.toLocaleDateString(INTL_LOCALE, { day: 'numeric', month: 'short' })
        );
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
        { key: 'web', label: T.donutCats.web, color: '#58c4ff' },
        { key: 'dev', label: T.donutCats.dev, color: '#316bf3' },
        { key: 'branding', label: T.donutCats.branding, color: '#8fd4ff' }
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

    ctx.textAlign = 'center';
    ctx.fillStyle = '#e6eefb';
    ctx.font = '700 26px Inter, sans-serif';
    ctx.fillText(String(dashState.projects.length), cx, cy + 4);
    ctx.fillStyle = '#9fb2d1';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(T.donutCenterLabel, cx, cy + 20);

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
        wrap.innerHTML = `<p class="font-body-md text-body-md text-on-surface-variant py-stack-sm">${T.inquiriesEmpty}</p>`;
        return;
    }

    const rows = inquiries.slice(-6).reverse().map(q => `
        <tr class="border-b border-outline-variant/40 hover:bg-surface-container-low transition-colors duration-200">
            <td class="py-3 pr-4 font-body-sm text-body-sm text-on-surface whitespace-nowrap">${escapeHtml(q.firstName)} ${escapeHtml(q.lastName)}</td>
            <td class="py-3 pr-4 font-body-sm text-body-sm text-secondary-fixed-dim">${escapeHtml(q.email)}</td>
            <td class="py-3 pr-4 font-body-sm text-body-sm text-on-surface-variant">${escapeHtml(q.inquiryType || T.inquiryTypeFallback)}</td>
            <td class="py-3 font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">${new Date(q.receivedAt).toLocaleDateString(INTL_LOCALE, { day: 'numeric', month: 'short' })}</td>
        </tr>`).join('');

    wrap.innerHTML = `
        <div class="overflow-x-auto">
        <table class="w-full text-left">
        <thead><tr class="border-b border-outline-variant">
            <th class="py-2 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">${T.tableName}</th>
            <th class="py-2 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">${T.tableEmail}</th>
            <th class="py-2 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">${T.tableType}</th>
            <th class="py-2 font-label-md text-label-md text-on-surface-variant uppercase">${T.tableDate}</th>
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

/* ---------- Contact form (about.html) ---------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';

    form.querySelectorAll('input, select, textarea').forEach(el => el.classList.add('field-glow'));

    const feedback = document.getElementById('form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = T.formSending;

        const payload = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            inquiryType: form.inquiryType.value,
            message: form.message.value,
            // Honeypot: bots fill hidden fields; real users leave it empty.
            website: form.website ? form.website.value : ''
        };

        try {
            const result = await submitInquiry(payload);
            if (result.ok) {
                showFeedback(feedback, T.formSuccess, true);
                form.reset();
            } else {
                showFeedback(feedback, result.message || T.formGenericError, false);
            }
        } catch {
            showFeedback(feedback, T.formConnectionError, false);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = T.formSubmit;
        }
    });
}

/* ---------- Dual-mode inquiry submission ----------
   Static deployments POST to a configured form service (e.g. Formspree);
   full-stack deployments POST to the bundled Express API. Returns
   { ok, message } and throws only on a network failure. */
async function submitInquiry(payload) {
    const cfg = window.SITE_CONFIG || {};

    if (cfg.formEndpoint) {
        const res = await fetch(cfg.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) return { ok: true };
        let message = '';
        try {
            const data = await res.json();
            message = (data.errors && data.errors.map(e => e.message).join(' ')) || '';
        } catch { /* non-JSON error response */ }
        return { ok: false, message };
    }

    const res = await fetch((cfg.apiBase || '') + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, message: (data.errors || []).join(' ') };
}

function showFeedback(el, message, success) {
    el.textContent = message;
    el.classList.remove('hidden', 'bg-error-container', 'text-on-error-container', 'bg-secondary-fixed', 'text-on-secondary-fixed');
    el.classList.add(...(success
        ? ['bg-secondary-fixed', 'text-on-secondary-fixed']
        : ['bg-error-container', 'text-on-error-container']));
}

/* ---------- Dynamic copyright year ---------- */
function setCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('[data-copyright-year]').forEach(el => {
        el.textContent = year;
    });
}

/* ---------- Project case study (project.html) ----------
   Reads ?id= from the URL and renders the matching project (dual-mode load).
   Derives a generic challenge/approach/results narrative from the project data. */
async function initProjectDetail() {
    const root = document.getElementById('project-detail');
    if (!root) return;

    const id = new URLSearchParams(location.search).get('id');
    const projects = await loadProjects();
    const project = projects.find(p => String(p.id) === String(id));

    if (!project) {
        root.innerHTML = `
            <div class="text-center py-stack-2xl">
                <h1 class="font-display-md text-display-md text-primary mb-4">${T.projectNotFoundTitle}</h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">${T.projectNotFoundBody}</p>
                <a href="portfolio.html" class="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-label-lg text-label-lg">
                    ${T.backToPortfolio} <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
            </div>`;
        document.title = `${T.projectNotFoundTitle} · AuraDesign Studio`;
        return;
    }

    document.title = `${project.title} · AuraDesign Studio`;
    const blocks = T.caseStudyBlocks(project);
    root.innerHTML = `
        <article class="max-w-5xl mx-auto">
            <a href="portfolio.html" class="inline-flex items-center gap-2 text-secondary font-label-md text-label-md uppercase tracking-wider mb-6">
                <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span> ${T.backToPortfolio}
            </a>
            <div class="text-secondary font-label-md text-label-md uppercase tracking-wider mb-3">${escapeHtml(project.label)}</div>
            <h1 class="font-display-md text-display-md text-primary mb-6">${escapeHtml(project.title)}</h1>
            <img alt="${escapeHtml(project.imageAlt)}" src="${escapeHtml(project.image)}" width="1200" height="675" class="w-full aspect-video object-cover border border-surface-variant shadow-ambient-1 shadow-ambient-2 mb-10"/>
            <p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-12">${escapeHtml(project.description)}</p>
            <div class="grid md:grid-cols-3 gap-6">
                ${blocks.map(b => `
                    <section class="bg-surface-container-lowest border border-surface-variant p-6">
                        <h2 class="font-headline-sm text-headline-sm text-primary mb-3">${b.heading}</h2>
                        <p class="font-body-md text-body-md text-on-surface-variant">${b.body}</p>
                    </section>`).join('')}
            </div>
            <div class="mt-16 text-center">
                <a href="https://your-agency-site.example.com" class="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 font-label-lg text-label-lg">
                    ${T.startProjectCta} <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
            </div>
        </article>`;
}

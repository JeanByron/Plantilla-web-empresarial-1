/* ============================================================================
   AuraDesign Studio — portfolio data (static fallback)
   ----------------------------------------------------------------------------
   In STATIC mode (no Node backend) this array is the source of the portfolio
   and the case-study pages. Keep it in sync with server/data/projects.json if
   you also run the full-stack backend.

   Fields:
     id          unique number, used in project.html?id=<id>
     title       project name
     label        short category label shown on the card
     categories   filter keys: 'web', 'dev', 'branding' (used by the filters)
     description  shown on hover and on the case-study page
     image        path to the image (relative to /public)
     imageAlt     accessible alt text
     wide         true => the card spans two columns
   ============================================================================ */
window.PROJECTS_FALLBACK = [
    {
        id: 1,
        title: 'Nexus Financial',
        label: 'Web & Development',
        categories: ['web', 'dev'],
        description: 'A full redesign of a legacy banking app, focused on user-centered dashboards and streamlined transactional flows.',
        image: 'img/project-1.svg',
        imageAlt: 'Modern fintech dashboard on a high-resolution monitor',
        wide: false
    },
    {
        id: 2,
        title: 'Lumina Partners',
        label: 'Branding',
        categories: ['branding'],
        description: 'Strategic brand positioning and a visual identity system for a boutique consultancy operating in global markets.',
        image: 'img/project-2.svg',
        imageAlt: 'Minimalist brand identity presentation',
        wide: false
    },
    {
        id: 3,
        title: 'Aether Apparel',
        label: 'Web Design',
        categories: ['web'],
        description: 'An immersive, high-performance headless commerce experience designed to highlight product detail and simplify the path to purchase.',
        image: 'img/project-3.svg',
        imageAlt: 'Minimalist e-commerce site on a laptop',
        wide: false
    },
    {
        id: 4,
        title: 'Synthetix BI',
        label: 'Web & Development',
        categories: ['web', 'dev'],
        description: 'A robust, enterprise-grade business intelligence platform. We architected the front end to handle large data volumes while keeping a smooth 60fps experience with complex interactive visualizations.',
        image: 'img/project-4.svg',
        imageAlt: 'Data visualization platform',
        wide: true
    },
    {
        id: 5,
        title: 'Vanguard Architecture',
        label: 'Branding',
        categories: ['branding'],
        description: 'A typography-led identity refresh for an award-winning architecture studio, designed to reflect its structural, brutalist style.',
        image: 'img/project-5.svg',
        imageAlt: 'Minimalist architectural identity stationery',
        wide: false
    }
];

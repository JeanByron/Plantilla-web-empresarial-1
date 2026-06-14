/** @type {import('tailwindcss').Config} */
// Dark futuristic design system: deep blues with soft cyan accents.
// Several surface tones use alpha (8-digit hex) so the animated dot background
// shows through behind the sections.
// The product is dark-theme only: no darkMode config or dark: variants.
module.exports = {
    content: ['./public/**/*.html', './public/js/**/*.js'],
    theme: {
        extend: {
            colors: {
                "on-primary-fixed-variant": "#b9c8e8",
                "on-tertiary": "#02101f",
                "surface-container-lowest": "#0d142acc",
                "on-surface-variant": "#9fb2d1",
                "surface-container-low": "#101a33b3",
                "surface-container": "#14203d99",
                "inverse-surface": "#e2ecf9",
                "on-secondary-fixed": "#d8eeff",
                "on-background": "#dbe6f7",
                "primary": "#eaf2ff",
                "secondary": "#58c4ff",
                "surface-variant": "#1c2a4a",
                "on-error-container": "#ffb4ab",
                "surface-container-highest": "#0c1226cc",
                "on-tertiary-container": "#a8c4e8",
                "on-error": "#1a0505",
                "primary-fixed": "#16223f",
                "secondary-fixed-dim": "#8fd4ff",
                "primary-fixed-dim": "#2a3a63",
                "on-surface": "#e6eefb",
                "on-primary": "#050b18",
                "inverse-on-surface": "#0a0f1d",
                "background": "#050810",
                "on-tertiary-fixed-variant": "#8fb8e8",
                "tertiary-fixed-dim": "#9fd8ff",
                "tertiary": "#9fd8ff",
                "outline": "#4a5d85",
                "inverse-primary": "#1b2a4d",
                "outline-variant": "#223352",
                "on-secondary": "#02101f",
                "on-secondary-fixed-variant": "#8fb8e8",
                "surface": "#0a101fcc",
                "surface-container-high": "#182648",
                "error-container": "#43101a",
                "tertiary-container": "#11335c",
                "on-tertiary-fixed": "#d3e8ff",
                "secondary-fixed": "#123a5e",
                "secondary-container": "#1c4f8f",
                "on-secondary-container": "#d8eeff",
                "surface-bright": "#131c33",
                "surface-tint": "#58c4ff",
                "surface-dim": "#1a2746",
                "primary-container": "#16223f",
                "on-primary-container": "#b9c8e8",
                "on-primary-fixed": "#dbe6f7",
                "error": "#ff5449",
                "tertiary-fixed": "#0f2a4a"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "base": "8px",
                "stack-md": "32px",
                "margin-mobile": "20px",
                "margin-desktop": "64px",
                "container-max": "1280px",
                "stack-lg": "64px",
                "stack-2xl": "96px",
                "gutter": "32px",
                "stack-sm": "16px",
                "section-y": "128px"
            },
            fontFamily: {
                "body-sm": ["Work Sans"],
                "display-lg-mobile": ["Inter"],
                "body-lg": ["Work Sans"],
                "headline-xl": ["Inter"],
                "display-lg": ["Inter"],
                "label-md": ["Inter"],
                "body-md": ["Work Sans"],
                "headline-lg": ["Inter"],
                "headline-md": ["Inter"],
                "headline-sm": ["Inter"],
                "display-md": ["Inter"],
                "label-lg": ["Inter"]
            },
            fontSize: {
                "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
                "display-lg-mobile": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "headline-xl": ["48px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "label-md": ["14px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }],
                "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                "headline-lg": ["32px", { "lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
                "headline-sm": ["20px", { "lineHeight": "1.4", "fontWeight": "600" }],
                "display-md": ["44px", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "label-lg": ["16px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }]
            }
        }
    },
    // Same plugins the Play CDN used to load (?plugins=forms,container-queries)
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries')
    ]
};

/* ============================================================================
   AuraDesign Studio — site configuration
   ----------------------------------------------------------------------------
   Edit this file to switch between deployment modes. No build step required.

   apiBase:
     URL of the bundled Express backend. Leave empty ('') for a static
     deployment (Netlify, Vercel, GitHub Pages) — the portfolio then loads from
     js/projects-data.js. Set it (e.g. 'https://api.yoursite.com') only if you
     host the Node server on a different origin than the static front end.

   formEndpoint:
     Where the contact form is submitted. Leave empty to use the bundled
     Express API (full-stack mode). For a static deployment, paste a form
     service endpoint such as Formspree:
        formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
     The form sends JSON with an 'Accept: application/json' header, which
     Formspree and most form services accept.
   ============================================================================ */
window.SITE_CONFIG = {
    apiBase: '',
    formEndpoint: ''
};

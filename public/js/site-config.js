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
     Where the contact form is submitted.

     >>> IF YOU DEPLOY AS A STATIC SITE (the usual way: dragging the public/
     >>> folder to Netlify), THIS IS REQUIRED. Without it the contact form
     >>> cannot send anything. Get a free endpoint at https://formspree.io,
     >>> then paste it between the quotes below, e.g.:
        formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'

     Leave it empty ONLY if you run the bundled Node/Express backend
     (full-stack mode), which provides /api/contact itself.

     The form sends JSON with an 'Accept: application/json' header, which
     Formspree and most form services accept.
   ============================================================================ */
window.SITE_CONFIG = {
    apiBase: '',
    // Static site? Paste your Formspree endpoint here (REQUIRED for the form to work):
    formEndpoint: ''
};

# AuraDesign Studio

Plantilla web para agencias de diseño con tema oscuro futurista, efectos interactivos de ratón, navegación SPA sin recargas, dashboard con métricas y backend en Node.js/Express.

## Requisitos

- Node.js 18 o superior

## Instalación y ejecución

```bash
npm install
npm start        # producción
npm run dev      # desarrollo (reinicia al guardar cambios)
```

El sitio queda disponible en `http://localhost:3000`. Para usar otro puerto:

```powershell
$env:PORT = '3100'; npm start
```

## Estructura

```
├── public/                  # Frontend (servido por Express)
│   ├── index.html           # Inicio
│   ├── portfolio.html       # Portafolio (se llena desde /api/projects)
│   ├── services.html        # Servicios
│   ├── about.html           # Nosotros + Contacto (formulario funcional + mapa)
│   ├── dashboard.html       # Panel de control interactivo (KPIs, gráficas, consultas)
│   ├── favicon.svg          # Ícono del sitio
│   ├── css/styles.css       # Estilos compartidos y efectos
│   └── js/
│       ├── tailwind-config.js   # Design system (colores, tipografía, espaciados)
│       └── main.js              # Navegación SPA, efectos interactivos, portafolio, formulario y dashboard
└── server/
    ├── server.js            # Servidor Express + API
    └── data/
        ├── projects.json    # Proyectos del portafolio (editable)
        └── inquiries.json   # Consultas recibidas del formulario
```

## API

| Método | Ruta                          | Descripción                                      |
|--------|-------------------------------|--------------------------------------------------|
| GET    | `/api/projects`               | Lista los proyectos del portafolio               |
| GET    | `/api/projects?category=web`  | Filtra por categoría (`web`, `branding`, `dev`)  |
| POST   | `/api/contact`                | Recibe el formulario de contacto (con validación)|
| GET    | `/api/inquiries`              | Lista las consultas recibidas (uso interno)      |

## Notas

- Tailwind se carga por CDN (igual que en las maquetas originales); para producción se recomienda compilar Tailwind localmente.
- Para agregar o editar proyectos del portafolio, edita `server/data/projects.json` — la página los carga automáticamente.

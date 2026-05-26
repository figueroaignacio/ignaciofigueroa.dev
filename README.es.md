<div>

<img src="https://ignaciofigueroa.dev/images/og-home.png" alt="Ignacio Figueroa Portfolio" />

<br />

<!-- README-I18N:START -->

**English** | [Español](./README.es.md)

<!-- README-I18N:END -->

</div>

## Un portafolio moderno, rápido y completamente personalizado construido con Next.js, Tailwind CSS, Payload CMS y PostgreSQL.

Muestra mi trabajo, proyectos e incluye un asistente con IA para ayudar a los visitantes a explorar mi contenido de manera interactiva.

Este portafolio refleja mi enfoque en UI limpia, alto rendimiento, accesibilidad y una excelente experiencia de desarrollo.

## Stack Tecnológico

Este proyecto utiliza una configuración moderna de full-stack:

### Frontend

- Next.js
- React
- Tailwind CSS
- Motion (animaciones)

### Backend y CMS

- Payload CMS
- PostgreSQL
- Adaptador de Vercel Postgres

### IA

- Backend FastAPI ([github.com/figueroaignacio/assistant](https://github.com/figueroaignacio/assistant))
- Groq – inferencia ultrarrápida
- Chatbot de IA personalizado

### Herramientas

- ESLint, Prettier
- Configuración con pnpm workspace

## Estructura del Proyecto

El proyecto sigue una estructura estándar de Next.js 16 (App Router), integrado con Payload CMS 3.0.

```
.
├── public/              # Assets estáticos (imágenes, fuentes, etc.)
└── src/
    ├── app/             # Páginas de Next.js App Router
    │   ├── [locale]/    # Rutas internacionalizadas
    │   ├── (payload)/   # Rutas del admin de Payload
    │   └── api/         # Rutas de API
    ├── collections/     # Definiciones de colecciones de Payload CMS
    ├── components/      # Componentes globales de React
    │   └── ui/          # Primitivas de UI reutilizables (estilo shadcn/ui)
    ├── features/        # Lógica y componentes específicos de funciones
    ├── hooks/           # Hooks personalizados de React
    ├── i18n/            # Configuración de internacionalización
    ├── lib/             # Utilidades compartidas, cliente de DB y auth
    ├── locales/         # Diccionarios de traducción (JSON)
    ├── migrations/      # Migraciones de base de datos
    ├── payload.config.ts # Configuración de Payload CMS
    └── payload-types.ts # Tipos generados automáticamente del CMS
```

## Asistente de IA

Este portafolio incluye un asistente de IA completamente integrado para ayudar a los visitantes a explorar mi contenido de manera interactiva.

### Potenciado por FastAPI y Groq, el Asistente de IA ofrece:

- Respuestas sobre mí, mi formación y mi trabajo
- Ayuda para navegar por el sitio
- Información sobre las tecnologías que utilizo
- Discusiones y resúmenes de mis artículos del blog
- Orientación contextual sobre mis proyectos y stack

### El Asistente de IA muestra cómo las funciones de IA del mundo real pueden integrarse en una UI moderna usando:

- Next.js App Router
- Modelos de Groq
- Animaciones con Framer Motion
- UI limpia y minimalista con Tailwind

Es parte asistente personal, parte demo técnica y un guiño divertido a mi nombre:

## Contacto

No dudes en contactarme:

- Email: figueroaignaciodev@gmail.com
- LinkedIn: https://www.linkedin.com/in/figueroa-ignacio
- GitHub: https://github.com/figueroaignacio

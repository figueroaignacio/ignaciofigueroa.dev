<div>
<img src="https://ignaciofigueroa.dev/images/og-image.png" alt="Ignacio Figueroa Portfolio" />
<br />

<!-- README-I18N:START -->

[English](./README.md) | **Español**

<!-- README-I18N:END -->
</div>

# Portafolio de Ignacio Figueroa

El sitio personal de Ignacio Figueroa, desarrollador fullstack en Buenos Aires, Argentina. Construido con Next.js (App Router), Tailwind CSS, Payload CMS y PostgreSQL.

Cuenta con un chatbot de IA personalizado que se conecta a un backend en FastAPI para permitir a los visitantes explorar mi stack y mi experiencia de forma interactiva.

## Stack Tecnológico

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Motion
- **Backend y CMS:** Payload CMS 3.0, PostgreSQL (Vercel/Neon)
- **Backend de IA:** FastAPI con LangChain y Google Gemini ([github.com/figueroaignacio/assistant](https://github.com/figueroaignacio/assistant))
- **Herramientas:** pnpm, ESLint, Prettier, Husky

## 🏗️ Estructura del Proyecto

```txt
.
├── public/               # Assets estáticos
└── src/
    ├── app/              # Rutas de App Router (enrutamiento dinámico y backend de Payload)
    │   ├── [locale]/     # Páginas principales internacionalizadas
    │   ├── (payload)/    # Interfaz de administración de Payload CMS
    │   └── api/          # Route handlers internos
    ├── features/         # Grupos de features modulares (home, projects, assistant)
    ├── locales/          # Diccionarios de traducción (JSON)
    ├── migrations/       # Migraciones DDL para base de datos Vercel/Neon
    ├── shared/           # Colecciones, layout, primitivas de UI y utilidades
    └── payload.config.ts # Configuración del CMS
```

## Asistente de IA

Un chatbot de IA promedio suele ser un simple wrapper que reenvía preguntas del usuario. Este asistente usa FastAPI, LangChain y Google Gemini para responder sobre mi stack, proyectos y educación directamente en la UI. Funciona tanto como un chatbot de ayuda como una demo técnica de la integración de un agente con el cliente.

## 💬 Contacto

- Email: contact@ignaciofigueroa.dev
- LinkedIn: [linkedin.com/in/figueroa-ignacio](https://www.linkedin.com/in/figueroa-ignacio)
- GitHub: [github.com/figueroaignacio](https://github.com/figueroaignacio)

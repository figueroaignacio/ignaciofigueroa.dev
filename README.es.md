<div>
<img src="https://ignaciofigueroa.dev/images/og-home.png" alt="Ignacio Figueroa Portfolio" />
<br />

<!-- README-I18N:START -->

[English](./README.md) | **Español**

<!-- README-I18N:END -->
</div>

# Portafolio de Ignacio Figueroa

Un portafolio fullstack construido con Next.js (App Router), Tailwind CSS, Payload CMS y PostgreSQL.

Cuenta con un chatbot de IA personalizado que se conecta a un backend en FastAPI para permitir a los visitantes explorar mi stack y mi experiencia de forma interactiva.

## Stack Tecnológico

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Motion
- **Backend y CMS:** Payload CMS 3.0, PostgreSQL (Vercel/Neon)
- **Backend de IA:** FastAPI con inferencia de Groq ([github.com/figueroaignacio/assistant](https://github.com/figueroaignacio/assistant))
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
    ├── collections/      # Configuraciones de esquemas de colecciones de Payload
    ├── components/       # Layout y componentes del frontend principal
    ├── features/         # Grupos de features modulares (about, assistant, contact)
    ├── locales/          # Diccionarios de traducción (JSON)
    ├── migrations/       # Migraciones DDL para base de datos Vercel/Neon
    └── payload.config.ts # Configuración del CMS
```

## Asistente de IA

Un chatbot de IA promedio suele ser un simple wrapper que reenvía preguntas del usuario. Este asistente usa FastAPI y Groq para responder rápidamente sobre mi stack, proyectos y educación directamente en la UI. Funciona tanto como un chatbot de ayuda como una demo técnica de la integración de un agente con el cliente.

## 💬 Contacto

- Email: figueroaignaciodev@gmail.com
- LinkedIn: [linkedin.com/in/figueroa-ignacio](https://www.linkedin.com/in/figueroa-ignacio)
- GitHub: [github.com/figueroaignacio](https://github.com/figueroaignacio)

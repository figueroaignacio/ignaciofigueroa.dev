<div>
<img src="https://ignaciofigueroa.dev/images/og-image.png" alt="Ignacio Figueroa Portfolio" />
<br />

<!-- README-I18N:START -->

**English** | [Español](./README.es.md)

<!-- README-I18N:END -->
</div>

# Ignacio Figueroa's Portfolio

The personal site of Ignacio Figueroa, a fullstack developer in Buenos Aires, Argentina. Built with Next.js (App Router), Tailwind CSS, Payload CMS, and PostgreSQL.

It features a custom AI chatbot that integrates with a FastAPI backend to let visitors explore my stack and experience interactively.

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS 4, Motion
- **Backend & CMS:** Payload CMS 3.0, PostgreSQL (Vercel/Neon)
- **AI Backend:** FastAPI with LangChain and Google Gemini ([github.com/figueroaignacio/assistant](https://github.com/figueroaignacio/assistant))
- **Tooling:** pnpm, ESLint, Prettier, Husky

## 🏗️ Project Structure

```txt
.
├── public/               # Static assets
└── src/
    ├── app/              # App Router routes (dynamic routing & Payload backend)
    │   ├── [locale]/     # Internationalized main pages
    │   ├── (payload)/    # Payload CMS admin interface
    │   └── api/          # Internal route handlers
    ├── features/         # Modular feature groups (home, projects, assistant)
    ├── locales/          # Translation dictionaries (JSON)
    ├── migrations/       # Vercel/Neon DB DDL migrations
    ├── shared/           # Collections, layout chrome, UI primitives, libs
    └── payload.config.ts # CMS configuration
```

## AI Assistant

A standard AI chatbot is usually a simple wrapper forwarding user queries. This assistant uses FastAPI, LangChain, and Google Gemini to answer questions about my stack, projects, and education directly inside the UI. It functions as both a helper chatbot and a technical demo of client-to-agent integration.

## 💬 Contact

- Email: contact@ignaciofigueroa.dev
- LinkedIn: [linkedin.com/in/figueroa-ignacio](https://www.linkedin.com/in/figueroa-ignacio)
- GitHub: [github.com/figueroaignacio](https://github.com/figueroaignacio)

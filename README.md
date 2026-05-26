<div>

<img src="https://ignaciofigueroa.dev/images/og-home.png" alt="Ignacio Figueroa Portfolio" />

<br />

<!-- README-I18N:START -->

**English** | [Español](./README.es.md)

<!-- README-I18N:END -->

</div>

---

# A modern, fast, and fully custom portfolio built with Next.js, Tailwind CSS, Payload CMS, and PostgreSQL.

It showcases my work, projects, and includes an AI-powered assistant to help visitors explore my content in an interactive way.

This portfolio reflects my focus on clean UI, high performance, accessibility, and a great developer experience.

---

# Tech Stack

This project uses a modern full-stack setup:

## Frontend

- Next.js
- React
- Tailwind CSS
- Motion (animations)

## Backend & CMS

- Payload CMS
- PostgreSQL
- Vercel Postgres adapter

## AI

- FastAPI backend ([github.com/figueroaignacio/assistant](https://github.com/figueroaignacio/assistant))
- Groq – ultra-fast inference
- Custom AI chatbot

## Tooling

- ESLint, Prettier
- pnpm workspace setup

---

# 🏗️ Project Structure

The project follows a standard Next.js 16 (App Router) structure, integrated with Payload CMS 3.0.

```txt
.
├── public/               # Static assets (images, fonts, etc.)
└── src/
    ├── app/              # Next.js App Router pages
    │   ├── [locale]/     # Internationalized routes
    │   ├── (payload)/    # Payload admin routes
    │   └── api/          # API routes
    ├── collections/      # Payload CMS collections definitions
    ├── components/       # Global React components
    │   └── ui/           # Reusable UI primitives (shadcn/ui style)
    ├── features/         # Feature-specific logic and components
    ├── hooks/            # Custom React hooks
    ├── i18n/             # Internationalization configuration
    ├── lib/              # Shared utilities, DB client, and auth
    ├── locales/          # Translation dictionaries (JSON)
    ├── migrations/       # Database migrations
    ├── payload.config.ts # Payload CMS configuration
    └── payload-types.ts  # Auto-generated CMS types
```

---

# AI Assistant

This portfolio includes a fully integrated AI assistant to help visitors explore my content in an interactive way.

## Powered by FastAPI and Groq, AI Assistant provides:

- Answers about me, my background, and my work
- Help navigating the website
- Insights about the technologies I use
- Discussions and summaries of my blog posts
- Context-aware guidance about my projects and stack

## AI Assistant shows how real-world AI features can be integrated into a modern UI using:

- Next.js App Router
- Groq models
- Framer Motion animations
- Clean, minimal UI with Tailwind

It is part personal assistant, part tech demo, and a fun nod to my name.

---

# 💬 Contact

Feel free to reach out:

- Email: figueroaignaciodev@gmail.com
- LinkedIn: https://www.linkedin.com/in/figueroa-ignacio
- GitHub: https://github.com/figueroaignacio

<!-- README-I18N:START -->

**English** | [Español](./README.es.md)

<!-- README-I18N:END -->

## A modern, fast, and fully custom portfolio built with Next.js, Tailwind CSS, Payload CMS, and PostgreSQL.

It showcases my work, projects, and includes an AI-powered assistant to help visitors explore my content in an interactive way.

This portfolio reflects my focus on clean UI, high performance, accessibility, and a great developer experience.

## Tech Stack

This project uses a modern full-stack setup:

### Frontend

- Next.js
- React
- Tailwind CSS
- Motion (animations)

### Backend & CMS

- Payload CMS
- PostgreSQL
- Vercel Postgres adapter

### AI

- FastAPI backend ([github.com/figueroaignacio/assistant](https://github.com/figueroaignacio/assistant))
- Groq – ultra-fast inference
- Custom AI chatbot

### Tooling

- ESLint, Prettier
- pnpm workspace setup

## 🏗️ Project Structure

The project follows a standard Next.js 16 (App Router) structure, integrated with Payload CMS 3.0.

```
.
├── public/              # Static assets (images, fonts, etc.)
└── src/
    ├── app/             # Next.js App Router pages
    │   ├── [locale]/    # Internationalized routes
    │   ├── (payload)/   # Payload admin routes
    │   └── api/         # API routes
    ├── collections/     # Payload CMS collections definitions
    ├── components/      # Global React components
    │   └── ui/          # Reusable UI primitives (shadcn/ui style)
    ├── features/        # Feature-specific logic and components
    ├── hooks/           # Custom React hooks
    ├── i18n/            # Internationalization configuration
    ├── lib/             # Shared utilities, DB client, and auth
    ├── locales/         # Translation dictionaries (JSON)
    ├── migrations/      # Database migrations
    ├── payload.config.ts # Payload CMS configuration
    └── payload-types.ts # Auto-generated CMS types
```

## AI Assistant

This portfolio includes a fully integrated AI assistant to help visitors explore my content in an interactive way.

### Powered by FastAPI and Groq, AI Assistant provides:

- Answers about me, my background, and my work
- Help navigating the website
- Insights about the technologies I use
- Discussions and summaries of my blog posts
- Context-aware guidance about my projects and stack

### AI Assistant shows how real-world AI features can be integrated into a modern UI using:

- Next.js App Router
- Groq models
- Framer Motion animations
- Clean, minimal UI with Tailwind

It is part personal assistant, part tech demo, and a fun nod to my name:

## 💬 Contact

Feel free to reach out:

- Email: figueroaignaciodev@gmail.com
- LinkedIn: https://www.linkedin.com/in/figueroa-ignacio
- GitHub: https://github.com/figueroaignacio

# Design System: Ignacio Figueroa Portfolio

## 1. Visual Theme & Atmosphere

Editorial minimal. A single readable column (`max-w-3xl`), generous whitespace, hairline borders, and a quiet, lowercase voice. Depth never comes from shadows — it comes from the **frame + inset panel** card language: an outer frame on `bg-card` holding an inset panel on `bg-background`. Long-form text is serif (Source Serif 4); structure is signaled by tiny uppercase mono labels; the only saturated color is one Google-blue accent.

## 2. Core Card Language

Every itemized or contained piece of content uses the same geometry (see `src/shared/components/ui/item-card.tsx`):

```
┌─ frame: rounded-xl · border-border · bg-card ─┐
│  header: px-4 py-3 (sits on the frame)        │
│  ┌─ panel: mx-1.5 mb-1.5 · rounded-lg ─────┐  │
│  │  border-border · bg-background · p-4    │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

- **`ItemCard`** — header above panel. Used by: education, certifications, projects, contributions, GitHub stats, nach-ui CTA, contact links.
- **Flat card** — single surface, no inset panel (`rounded-xl border-border bg-card p-4`). Used by: tech stack categories.
- **Inverted variant** — panel above, attribution/action row below (`mx-1.5 mt-1.5`). Used by: testimonials, CV CTA.
- **Bare frame** — `p-1.5` frame around a single panel, no header. Used by: whoami video, contact form.
- **Exception — experience** is not carded: it renders as a résumé timeline (`border-l` hairline, one dot per entry — filled `bg-foreground` for the current role — `type-meta` date above a `type-item-title` heading, bullets, chips).

The light theme makes this read by contrast: page is `#ffffff`, frame is Google frost `#f0f4f9`, panel returns to white. Dark mirrors it: page `#000000`, frame `#111111`, panel back to black.

## 3. Color Tokens (`src/app/globals.css`)

The light palette is Google's: frost surfaces, Material blue, and the gray ramp from Google's products.

| Token                 | Light     | Dark                    | Role                       |
| --------------------- | --------- | ----------------------- | -------------------------- |
| `--background`        | `#ffffff` | `#000000`               | Page + inset panels        |
| `--card`              | `#f0f4f9` | `#111111`               | Card frames                |
| `--foreground`        | `#1f1f1f` | `#e5e5e5`               | Primary text               |
| `--primary`           | `#0b57d0` | `#8ab4f8`               | Links, hover accents       |
| `--secondary`         | `#e9eef6` | `#1a1a1a`               | Chip fills (used at `/30`) |
| `--accent`            | `#d3e3fd` | `#1e1f20`               | Selected states            |
| `--muted`             | `#747775` | `rgba(255,255,255,.45)` | Section labels, dates      |
| `--muted-foreground`  | `#5f6368` | `rgba(255,255,255,.55)` | Secondary text (most-used) |
| `--muted-strong`      | `#444746` | `rgba(255,255,255,.7)`  | Hero tagline               |
| `--border` / `--rule` | `#dadce0` | 8% alpha fg             | Hairlines everywhere       |
| `--destructive`       | `#d93025` | `#f87171`               | Form errors                |
| `--ring`              | `#0b57d0` | `#8ab4f8`               | Focus rings                |

`--radius: 1.25rem` overrides Tailwind's scale — `rounded-xl` = 1.5rem (frames), `rounded-lg` = 1.25rem (panels), `rounded-full` for chips.

## 4. Typography

Loaded in `src/shared/lib/fonts.ts`, wired as CSS variables on `<body>`:

- **Bricolage Grotesque** (`--font-sans`) — default UI/body text and all `h1–h6` (`--font-heading` is aliased to `--font-sans` in `globals.css`; only one loader).
- **Source Serif 4** (`--font-serif`) — long-form reading via `.prose-reading` (19px / 1.75, italic for asides and quotes).
- **JetBrains Mono** (`--font-mono`) — the structural voice: labels, chips, dates, card action links, footer, attributions.
- **Lowercase** is deliberate: action links, footer, attributions call `.toLowerCase()`.

### Type scale (`globals.css`, one class per hierarchy level)

| Class              | Spec                                                    | Used for                                        |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------- |
| `.type-display`    | `text-3xl md:text-4xl` semibold, tight, `leading-[1.1]` | Home hero `h1`                                  |
| `.type-page-title` | `text-2xl md:text-3xl` semibold, tight                  | Page `h1` (project detail, chat hero, 404)      |
| `.type-item-title` | `19px/20px` medium, tight, `leading-snug`               | Card/item `h3` titles                           |
| body               | `text-base` / `text-sm`                                 | Prose, descriptions                             |
| `.type-meta`       | mono `text-xs tabular-nums`                             | Dates, ranges                                   |
| `.type-label`      | mono `text-[11px]` uppercase `tracking-[0.2em]`         | Section labels (color: `text-muted-foreground`) |
| `.type-chip`       | mono `text-[10px] tracking-wide`                        | Tech chips                                      |

Weight ramp is deliberate: semibold only at `h1` level, medium for item titles, semibold/medium inside prose (`h2`/`h3`). Never `font-bold` in UI chrome.

## 5. Primitives (`src/shared/components/ui/`)

- **`Section`** (`section.tsx`) — `id` + mono label title + rule (a short `w-8` foreground segment fading into a hairline). Wraps every home section; anchors use `scroll-mt-12`.
- **`ItemCard`** (`item-card.tsx`) — the frame + inset panel described above.
- **`TechChip` / `TechChipGroup`** (`tech-chip.tsx`) — `rounded-full border-border/40 bg-secondary/30 px-2 py-0.5 text-[10px] font-mono`, optional `size-3` icon slot. Group is `flex flex-wrap gap-1.5`.
- Buttons: `.btn` + `.btn-primary` / `.btn-outline` component classes (`rounded-xl`, `active:scale-95`).

## 6. Layout

- **Container**: `max-w-3xl mx-auto p-4`, body padded `py-16`, sections stacked `space-y-14`.
- **Nav**: floating bottom `Dock` (`bg-background/80 backdrop-blur-xl rounded-2xl`), no top header.
- **Footer**: hairline `border-t`, mono, three clusters — identity, external links, theme/locale toggles.
- **Background**: masked dot/line grid at ~2% alpha (`BackgroundDecorations`).

## 7. Motion & Interaction

- Transitions: `transition-colors`/`transition-all duration-300`; hover states shift text to `--primary` or reveal underlines — never loud.
- Card hovers (where used, e.g. GitHub stats): `hover:-translate-y-0.5` + near-invisible shadow.
- Entrances: `.animate-fade-in-up` (700ms, `cubic-bezier(0.16,1,0.3,1)`), staggered by `.delay-150/.delay-300`.
- Cursor blink keyframes for the AI terminal effect.

## 8. Accessibility

- Focus rings via `--ring`; skip link; `scroll-smooth`; semantic `section`/`figure`/`blockquote`; icon-only elements carry `aria-hidden` and labels; theme respects class-based dark mode with `suppressHydrationWarning`.

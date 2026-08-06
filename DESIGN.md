# Design System: Ignacio Figueroa Portfolio

## 1. Visual Theme & Atmosphere

Editorial minimal. A contained readable column (`max-w-3xl`), generous whitespace, hairline borders, and a quiet, lowercase voice. Depth never comes from shadows — it comes from the **frame + inset panel** card language: an outer frame on `bg-card` holding an inset panel on `bg-background`. Text is serif (Source Serif 4); structure is signaled by tiny uppercase mono labels; the only saturated color is a single muted-amber accent, used in four places and nowhere else (§3).

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
- **Exception — experience & education** are not carded: they render as résumé timelines (`border-l` hairline, one dot per entry — `bg-brand` with a soft `ring-brand/15` for the current entry, hairline outline for the rest — `type-meta` date above a `type-item-title` heading, bullets, chips).

Both themes read by the same contrast move: the page is the darkest/lightest surface, the frame steps toward mid, and the inset panel returns to the page value.

## 3. Color Tokens (`src/app/globals.css`)

The palette is warm and near-neutral: a bone canvas in light, a stone-black canvas in dark. Every value is `oklch`. Only **one** hue is saturated.

| Token                 | Light                  | Dark                   | Role                       |
| --------------------- | ---------------------- | ---------------------- | -------------------------- |
| `--background`        | `oklch(98.5% .004 70)` | `oklch(14% .002 70)`   | Page + inset panels        |
| `--card`              | `oklch(96.2% .004 70)` | `oklch(18.5% .002 70)` | Card frames                |
| `--foreground`        | `oklch(18% .003 70)`   | `oklch(92% .002 70)`   | Primary text               |
| `--brand`             | `oklch(52% .115 71)`   | `oklch(76% .117 71)`   | **The only accent**        |
| `--primary`           | `oklch(18% .003 70)`   | `oklch(92% .002 70)`   | Solid button fill          |
| `--secondary`         | `oklch(93.5% .005 70)` | `oklch(24% .002 70)`   | Chip fills                 |
| `--muted-foreground`  | `oklch(48% .004 70)`   | `oklch(66% .002 70)`   | Secondary text (most-used) |
| `--muted-strong`      | `oklch(35% .004 70)`   | `oklch(80% .002 70)`   | Hero tagline               |
| `--border` / `--rule` | `oklch(90.5% .004 70)` | `oklch(25% .002 70)`   | Hairlines everywhere       |
| `--ring`              | `oklch(18% .003 70)`   | `oklch(92% .002 70)`   | Focus rings                |

### Contrast floor

Every text token clears **4.5:1** against the surface it sits on, with headroom for alpha modifiers:

| Pair                                | Ratio    |
| ----------------------------------- | -------- |
| `--foreground` on `--background`    | 15.7 : 1 |
| `--muted-strong` on `--background`  | 10.9 : 1 |
| `--muted-foreground` (dark)         | 6.5 : 1  |
| `--muted-foreground` (light)        | 6.3 : 1  |
| `--brand` (dark) on `--background`  | 9.1 : 1  |
| `--brand` (light) on `--background` | 5.4 : 1  |

Because of that floor, **do not stack alpha on text tokens** (`text-muted-foreground/70` etc.). The `/90` and `/70` modifiers that used to exist dropped body copy to ~3.9:1.

### The accent rule

`--brand` is muted amber (`#E0A458` in dark, darkened to `oklch(52% .115 71)` in light so it clears 4.5:1 on the bone canvas). It is deliberately **not** the blue/cyan every dev portfolio uses. It appears in exactly four places:

1. Link hover (`hover:text-brand` / `hover:decoration-brand`)
2. The current entry's timeline dot
3. The AI-assistant button border (`.btn-accent`) and its dock ring
4. The hero availability dot — same "this is live" semantic as (2)

Anywhere else is a regression. Tech-logo chips keep their brand colors, but only on `lead` chips (see §5); `muted` chips render their icons grayscale so a long list doesn't turn into a rainbow.

`--radius: 0.75rem` — `rounded-xl` = 1rem (frames), `rounded-lg` = 0.75rem (panels), `rounded-full` for chips.

## 4. Typography

**Two families, no more.** Loaded in `src/shared/lib/fonts.ts`, wired as CSS variables on `<body>`:

- **Source Serif 4** (`--font-serif`) — everything you _read_: `h1–h6`, body copy, and long-form `.prose-reading` (19px / 1.75, italic for asides and quotes). In `globals.css` both `--font-sans` and `--font-heading` alias to it, so `font-sans` in components resolves to the serif without any component churn.
- **JetBrains Mono** (`--font-mono`) — everything that _structures_: labels, chips, dates, buttons (`.btn`), dock labels, card action links, footer, attributions.
- **Lowercase** is deliberate: action links, footer, attributions call `.toLowerCase()`.

There is no third (sans) family. Bricolage Grotesque was removed — the serif/mono pair is the whole editorial voice.

Body sets `leading-relaxed` (1.625) globally; bullets and descriptions inherit it.

### Type scale (`globals.css`, one class per hierarchy level)

| Class              | Spec                                                     | Used for                                                                      |
| ------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `.type-display`    | `text-[2.125rem] md:text-5xl` semibold, `leading-[1.05]` | Home hero `h1`                                                                |
| `.type-page-title` | `text-2xl md:text-3xl` semibold, tight                   | Page `h1` (project detail, chat hero, 404)                                    |
| `.type-item-title` | `19px/20px` medium, tight, `leading-snug`                | Card/item `h3` titles                                                         |
| body               | `text-base` / `text-sm`                                  | Prose, descriptions                                                           |
| `.type-meta`       | mono `text-xs tabular-nums`                              | Dates, ranges                                                                 |
| `.type-label`      | mono `text-[11px]` uppercase `tracking-[0.2em]`          | Section labels (color: `text-muted-foreground`)                               |
| `.type-chip`       | mono `text-[10px] tracking-wide`                         | Assistant-only micro-labels (`TechChip` carries its own tone styles — see §5) |

Weight ramp is deliberate: semibold only at `h1` level, medium for item titles, semibold/medium inside prose (`h2`/`h3`). Never `font-bold` in UI chrome.

## 5. Primitives (`src/shared/components/ui/`)

- **`Section`** (`section.tsx`) — `id` + mono label title + rule (a short `w-8` foreground segment fading into a hairline). Wraps every home section; anchors use `scroll-mt-12`.
- **`ItemCard`** (`item-card.tsx`) — the frame + inset panel described above.
- **`TechChip` / `TechChipGroup`** (`tech-chip.tsx`) — mono, `rounded-full`, with **two tones** so a wall of chips reads as a hierarchy instead of noise:

  | `tone`            | Spec                                                                                                                   | Used for                                                                                                |
  | ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
  | `lead`            | `border-border bg-secondary/70 px-2.5 py-1 text-[11px] text-foreground`, `size-3.5` icon in full color                 | The stack worth remembering: `CORE_STACK`, `FOCUS_LEAD`, hero status, first 3 chips of a timeline entry |
  | `muted` (default) | `border-border/40 bg-secondary/25 px-2 py-0.5 text-[10px] text-muted-foreground`, `size-3` icon `grayscale opacity-70` | Everything else — supporting cast                                                                       |

  Never render a list where every chip is `lead`. Group is `flex flex-wrap items-center gap-1.5`.

- Buttons: `.btn` (mono) + `.btn-primary` / `.btn-outline` / `.btn-accent`. `.btn-accent` is reserved for the AI-assistant entry point — it is the only button that wears `--brand`.

## 6. Layout

- **Container**: `max-w-3xl mx-auto p-4` (~768px — a contained editorial measure, never edge-to-edge), sections stacked `space-y-14`.
- **Hero**: mobile-first flex column that becomes a two-column row at `md`. Left = name, tagline, description, actions. Right = `HeroStatus` (`hero-status.tsx`) in a `md:w-56 lg:w-60` rail split off by `md:border-l` — availability, current role, location, current stack. It carries **real** information, not decoration; on mobile the rail drops below the actions behind a `border-t`.
- **Nav**: floating bottom `Dock`, no top header.
  - Background is opaque-first: `bg-background/98`, thinning to `supports-[backdrop-filter]:bg-background/88` only where `backdrop-blur-2xl backdrop-saturate-150` can actually do its job. At 65% text was still legible through it.
  - **Auto-hides** on downward scroll past 240px and returns on the first upward scroll (8px jitter threshold, rAF-throttled). `onFocusCapture` brings it back for keyboard users.
  - Body reserves `--dock-space: 7.5rem` as `padding-bottom`, and `html` gets a matching `scroll-padding-bottom`, so the dock can never cover content or an anchor target. Do not add per-page spacer divs.
- **Footer**: hairline `border-t`, mono, three clusters — identity, external links, theme/locale toggles.
- **Background**: masked dot/line grid at ~2% alpha (`BackgroundDecorations`).

## 7. Motion & Interaction

- Transitions: `transition-colors`/`transition-all duration-300`; hover states shift text to `--brand` or reveal underlines — never loud.
- Card hovers (where used, e.g. GitHub stats): `hover:-translate-y-0.5` + near-invisible shadow.
- Entrances: `.animate-fade-in-up` (700ms, `cubic-bezier(0.16,1,0.3,1)`), staggered by `.delay-150/.delay-300`.
- Cursor blink keyframes for the AI terminal effect.

## 8. Accessibility

- Focus rings via `--ring`; skip link; `scroll-smooth`; semantic `section`/`figure`/`blockquote`; icon-only elements carry `aria-hidden` and labels; theme respects class-based dark mode with `suppressHydrationWarning`.

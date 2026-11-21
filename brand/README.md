# Higo — Ignacio Figueroa identity

Figueroa comes from _figueira_, the fig tree. The mark is a fig cut open: solid skin on one side, the ordered inside on the other, split by one straight cut that is also an I. Outside and inside, how a product looks and how it works.

## Files

| Folder    | What                                                                                                           |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `logo/`   | SVG masters. `symbol`, `horizontal`, `stacked`, `wordmark`, each in `ink`, `black` and `white`; `symbol-small` |
| `png/`    | Transparent PNGs of the symbol (1024), horizontal (2400 wide) and stacked (1600 wide), ink and white           |
| `icons/`  | `favicon.svg` (adapts to light/dark tabs), `favicon.ico`, app icons, maskable icon                             |
| `social/` | Avatars (1024), `og-image.jpg` (photo + lockup, used by the site), `og-brand-1200x630.png` (no photo)          |

Every logo is outlined paths. No font is needed to display them.

| Where                         | Use                                                                    |
| ----------------------------- | ---------------------------------------------------------------------- |
| ignaciofigueroa.dev           | `apps/web/public/icon.svg`, `src/app/favicon.ico`, PWA icons, OG image |
| GitHub, LinkedIn, X           | `social/avatar-dark-1024.png` (`avatar-light` on light profiles)       |
| CV, letters                   | `logo/higo-horizontal-black.svg`                                       |
| Slides, covers, square spaces | `logo/higo-stacked-*.svg`                                              |
| Project pages and side work   | `logo/higo-symbol-*.svg` next to the project's own name                |

## Versions

- **Horizontal** is the primary logo.
- **Stacked** for square or centred layouts.
- **Symbol** alone when the name is already nearby or space is small (avatars, favicons, a footer).
- **Wordmark** alone only where the symbol is already present on the same surface.
- **Small cut** (`higo-symbol-small-*`) at 32 px and below. Its seam and edges sit on the 16 px pixel grid. Never use it above 48 px.
- **White** files open the seam by 2 units and thin the ring by 1, because white on dark looks heavier. Always use them on dark backgrounds instead of recolouring the ink file.

## Clear space and minimum size

Clear space **X** is the gap between symbol and name in the horizontal lockup: twice the ring's thickness, about a third of the symbol's width. Keep X free on every side.

| Version    | Screen minimum           | Print minimum |
| ---------- | ------------------------ | ------------- |
| Horizontal | 120 px wide              | 30 mm wide    |
| Stacked    | 96 px wide               | 22 mm wide    |
| Symbol     | 16 px (small cut ≤32 px) | 5 mm tall     |

## Colour

The mark is one colour. It is never filled with the site accent.

| Name  | HEX       | Role                                                              |
| ----- | --------- | ----------------------------------------------------------------- |
| Ink   | `#141414` | The logo on light backgrounds; the site's light `--foreground`    |
| White | `#FFFFFF` | The logo on dark backgrounds                                      |
| Night | `#070707` | Dark surfaces; the site's dark `--background`                     |
| Black | `#000000` | Print and one-colour reproduction (K100; Pantone Neutral Black C) |

Approved pairs: ink on white or light neutrals, white on ink, night or black, and white on the dark areas of a photo. The celeste accent stays in the interface (links, markers) and never touches the mark.

## Typography

- Logo name: **Source Serif 4 Medium**, optical size 60, −0.5% tracking, outlined. Its cap height runs from 108 to 208 on the symbol's 256 grid; the baseline sits on the bottom of the inner ring.
- Site: Hanken Grotesk and DM Mono, unchanged.
- All three families are SIL Open Font License.

## Construction (256 grid)

Body circle r 86 at (128, 150). Shoulders ease into a 56-unit neck at y 40. Seam 16 wide on the vertical axis. Inner ring 28 thick, concentric with the body, only on the right half. Stalk on the left half only, leaning exactly 30°, its top cut perpendicular to its axis.

Small cut: r 96 at (128, 144), seam 32, ring 48, neck 96 at y 48.

## Don't

Stretch, rotate or mirror it · close the seam or move the stalk to the right half · fill the inside half · add outlines, shadows, gradients or the accent colour · rearrange or resize the parts of a lockup · retype the name in a live font · put it on busy areas of a photo.

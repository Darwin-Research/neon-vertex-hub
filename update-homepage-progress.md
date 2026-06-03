# Homepage Design System Update — Progress Log

**Date**: 2026-06-03  
**Branch**: `claude/design-system-update`  
**Status**: Committed locally, push pending (no GitHub credentials in this remote session)

---

## What Was Done

### 1. Design System Token File (NEW)
**`src/styles/darwin-design-system.css`**

Created a standalone design token file documenting the full Darwin Research brand identity (sourced from the Pilot Deck 2026). Contains:

| Token | Value | Usage |
|---|---|---|
| `--dr-brand` | `#B8935A` | Amber gold — primary accent, buttons, labels |
| `--dr-brand-lt` | `#F5E8D8` | Amber tint — hover backgrounds |
| `--dr-brand-dk` | `#9A7844` | Amber dark — button hover state |
| `--dr-canvas` | `#F7F3EE` | Page background — warm cream |
| `--dr-surface` | `#FFFFFF` | Card / panel surface |
| `--dr-plate` | `#F0EBE3` | Raised surface — column bg, input bg |
| `--dr-ink` | `#1C1713` | Primary text — warm charcoal |
| `--dr-ink-sub` | `#78685A` | Secondary text — warm brown-gray |
| `--dr-ink-muted` | `#A8968A` | Muted text — labels, placeholders |
| `--dr-line` | `#E8DDD5` | Default border — subtle warm |
| `--dr-font-sans` | Pretendard Variable | Korean-optimized font (CDN) |

Also defines shadow tokens (`--dr-shadow-sm/md/lg`), border radii, and label pattern reference comments.

---

### 2. CSS Variables — Dark Neon → Warm Palette
**`src/index.css`**

- **Removed**: dark neon theme (dark bg, bright green `hsl(150 100% 50%)` primary, glow effects)
- **Added**: warm cream palette mapped to shadcn/ui CSS variables
- **Added**: `@import` for `darwin-design-system.css`
- **Added**: `.dr-label`, `.dr-shadow`, `.dr-glow-text` utility classes
- **Changed**: body font → Pretendard Variable

Key CSS variable changes:
```
--background:  33 37% 95%   (#F7F3EE warm cream)
--primary:     36 40% 54%   (#B8935A amber gold)
--foreground:  26 19% 9%    (#1C1713 warm charcoal)
--border:      26 30% 87%   (#E8DDD5 warm border)
```

---

### 3. Tailwind Config
**`tailwind.config.ts`**

- Added `brand`, `canvas`, `plate`, `ink`, `line` color tokens mapping to Darwin vars
- Added Pretendard font family as `fontFamily.sans`
- Removed neon glow color extensions

---

### 4. Landing Page Redesign
**`src/pages/Index.tsx`**

Full redesign. Sections:

| Section | Before | After |
|---|---|---|
| Hero | Dark bg, neon green glow on "전략적 투자" | Warm cream, amber "Darwin Research" subtitle |
| Stats | Neon glow numbers | Clean amber numbers, uppercase muted labels |
| (New) Mission/Vision/Values | — | 3-card grid matching the Pilot Deck layout |
| Board posts | Icon + heading inline | `NOTICE` / `PRESS` amber labels above headings |
| (New) Next Steps CTA | — | 3-step card grid (자료 검토 → 1:1 미팅 → 리서치 착수) |

Removed: `glow-text`, `glow-box` classes, Lucide `Newspaper`/`Building2` icons in headings.

---

### 5. Navbar
**`src/components/layout/Navbar.tsx`**

- Background: `bg-background/80` (dark) → `bg-canvas/90` (warm cream)
- Logo: "DARWIN UNIVERSE" neon → `Darwin Research · 다윈리서치` amber label style
- Active nav item: `bg-primary text-primary-foreground` → `bg-brand text-white`
- Hover: → `hover:bg-plate`
- Dropdown: warm surface, warm border, matching item styles

---

### 6. Footer
**`src/components/layout/Footer.tsx`**

- Background: `bg-card` (dark) → `bg-canvas` (warm cream)
- Brand: same amber label format as Navbar
- Links: hover → `text-brand`
- Added amber tagline: `VENTURE CAPITAL · PRIVATE EQUITY`

---

## What's Pending

### Push to GitHub
The commit exists locally at `/home/user/neon-vertex-hub` on branch `claude/design-system-update` but could not be pushed — this remote Claude Code session has no GitHub credentials for `darwin-research/neon-vertex-hub`.

**To push**, one of the following is needed:

**Option A — Provide a GitHub PAT in this session:**
```bash
cd /home/user/neon-vertex-hub
git remote set-url origin https://<PAT>@github.com/Darwin-Research/neon-vertex-hub.git
git push -u origin claude/design-system-update
```

**Option B — Start a new Claude Code session** with `darwin-research/neon-vertex-hub` configured as the repository. The session will clone it fresh, so the local changes here will be lost — but all the file contents are documented below.

---

## File Contents for Manual Re-application

If starting a new session, apply these changes:

### `src/styles/darwin-design-system.css` (NEW FILE)
```css
/* Darwin Research — Design System Tokens */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");

:root {
  --dr-font-sans: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", "Malgun Gothic", sans-serif;

  --dr-brand:       #B8935A;
  --dr-brand-lt:    #F5E8D8;
  --dr-brand-dk:    #9A7844;
  --dr-canvas:      #F7F3EE;
  --dr-surface:     #FFFFFF;
  --dr-plate:       #F0EBE3;
  --dr-ink:         #1C1713;
  --dr-ink-sub:     #78685A;
  --dr-ink-muted:   #A8968A;
  --dr-line:        #E8DDD5;
  --dr-line-dk:     #D4C9BE;
  --dr-pending:     #9B9082;
  --dr-active:      #B8935A;
  --dr-review:      #C4735A;
  --dr-done:        #6A9E76;

  --dr-label-size:    10px;
  --dr-label-weight:  600;
  --dr-label-spacing: 0.12em;

  --dr-shadow-sm: 0 1px 3px rgba(28, 23, 19, 0.06);
  --dr-shadow-md: 0 4px 12px rgba(28, 23, 19, 0.08);
  --dr-shadow-lg: 0 8px 24px rgba(28, 23, 19, 0.12);
}
```

### `src/index.css` — Key changes
Replace `:root` variables with warm palette (see Section 2 above) and add:
```css
@import "./styles/darwin-design-system.css";

/* utility classes */
.dr-label {
  font-size: var(--dr-label-size);
  font-weight: var(--dr-label-weight);
  letter-spacing: var(--dr-label-spacing);
  text-transform: uppercase;
  color: var(--dr-brand);
}
.dr-shadow    { box-shadow: var(--dr-shadow-sm); }
.dr-shadow-md { box-shadow: var(--dr-shadow-md); }
.dr-glow-text { text-shadow: 0 2px 20px rgba(184, 147, 90, 0.3); }
```

### `tailwind.config.ts` — Add under `theme.extend.colors`:
```ts
brand:  { DEFAULT: "#B8935A", light: "#F5E8D8", dark: "#9A7844" },
canvas: "#F7F3EE",
plate:  "#F0EBE3",
ink:    { DEFAULT: "#1C1713", sub: "#78685A", muted: "#A8968A" },
line:   "#E8DDD5",
```
And under `theme.extend.fontFamily`:
```ts
sans: ["Pretendard Variable", "Pretendard", "-apple-system", "BlinkMacSystemFont",
       "Segoe UI", "Noto Sans KR", "Malgun Gothic", "sans-serif"],
```

---

## Commit Info

```
commit ee8ea89
branch: claude/design-system-update
message: feat: apply Darwin Research design system to landing page
files changed: 6
  new:      src/styles/darwin-design-system.css
  modified: src/index.css
  modified: tailwind.config.ts
  modified: src/pages/Index.tsx
  modified: src/components/layout/Navbar.tsx
  modified: src/components/layout/Footer.tsx
```

# Implementation Plan: working light/dark theme toggle

## Root cause (verified by reading the code)

- `src/App.tsx` toggles the `dark` class on `<html>` correctly (`isDark` state + `useEffect`).
- No markup reacts to it. `src/index.css` has no `@custom-variant dark`, and no component uses `dark:` or theme tokens. Every color is a hardcoded dark hex arbitrary value (`bg-[#12141A]`, `text-[#D1D5DB]`, ...), plus hex values in `index.css` (body, scrollbars) and in `index.html` (`<body class="bg-[#0A0B0E] ...">`, `<html class="dark">`).
- So the toggle flips a class that nothing reads. The app is always dark.

## Design decisions

1. Semantic color tokens via Tailwind v4 `@theme`, switched by the `.dark` class. Define every palette color once in `src/index.css` as `--color-<name>` inside `@theme`, with LIGHT values as defaults. Then override the same variables with today's exact dark hex values in `@layer base { .dark { ... } }`. Tailwind v4 utilities compile to `var(--color-<name>)`, and opacity modifiers compile to `color-mix(... var(--color-<name>) N%, transparent)`, so `bg-surface`, `border-accent/40`, etc. switch with the class and keep their opacity modifiers. Why: each hex repeats dozens of times across 9 files. Tokens give one source of truth and keep dark mode byte-for-byte the same as today. The `.dark` override wins because the `base` layer comes after `theme`.
2. Add `@custom-variant dark (&:where(.dark, .dark *));` so `dark:` follows the class instead of the OS media query. It is needed for decision 3.
3. Tailwind's built-in status scales (emerald / rose / amber) keep their current class as a `dark:` variant, with a light default placed before it (e.g. `text-emerald-700 dark:text-emerald-400`). Why: these are standard palette classes, not custom hex, and there are only a few. Keeping the original class verbatim under `dark:` guarantees an identical dark look without ~20 extra tokens. These classes stay unchanged because they read fine on both themes: solid fills (`bg-emerald-600`, `bg-rose-600`, `bg-emerald-500`, `bg-rose-500`, `bg-amber-400`), `border-*-500` and `border-*-500/80`, `text-white`, `shadow-rose-600/30`, `bg-black/70` overlays, `border-transparent`, `fill-current`.
4. Gold fills stay gold in both themes. `bg-accent` with `text-on-accent` (#0A0B0E) has about 8:1 contrast on any background. Only gold used as TEXT gets darker light values (`accent-fg`, `accent-fg-strong`), because #C5A059 text on white fails contrast (~2.3:1). So each gold hex is split by role: fill/border/ring/shadow/gradient vs. text.
5. No flash of the wrong theme, plus persistence. Add a small blocking inline script in `index.html` `<head>`. It reads `localStorage.getItem('theme')` (`'light' | 'dark'`), falls back to `matchMedia('(prefers-color-scheme: dark)')`, and sets or removes the `dark` class and `style.colorScheme` on `<html>` before the first paint. Keep `class="dark"` on `<html>` as the no-JS default. `App.tsx` initializes `isDark` from `document.documentElement.classList.contains('dark')`, so the script is the single source of truth. Its effect also writes `localStorage.setItem('theme', ...)` and sets `document.documentElement.style.colorScheme`. Wrap localStorage access in try/catch because it can throw in private modes. Leave the unused `ThemeMode` in `src/types.ts` alone; it stays out of scope.
6. Do not touch `src/data/**`, `vite.config.ts`, or `package.json`. No new dependencies.

## Color mapping table

Add each token to `@theme` with its light value. Put the dark value under `.dark`. The dark value is always the exact hex used today.

| Current dark hex | Role / where used | Token (`--color-…`) → utility | Dark value | Light value |
|---|---|---|---|---|
| #0A0B0E | page background (`bg-[#0A0B0E]`, `/90`, `/95` navbar/bottom bar, body, scrollbar track) | `canvas` → `bg-canvas` | #0A0B0E | #F7F6F2 |
| #0A0B0E | text/dot ON gold fills (`text-[#0A0B0E]`; `bg-[#0A0B0E]` radio dot inside gold circle, StartQuizModal L154) | `on-accent` → `text-on-accent`, `bg-on-accent` | #0A0B0E | #0A0B0E |
| #050608 | modal backdrop (`bg-[#050608]/80`) | `backdrop` → `bg-backdrop/80` | #050608 | #1F2430 |
| #0E1015 | sunken panels / modal body (`bg-[#0E1015]`, `/70`) | `inset` → `bg-inset` | #0E1015 | #F1EFEA |
| #12141A | cards / panels (`bg-[#12141A]`, gradient `to-[#12141A]`) | `surface` → `bg-surface`, `to-surface` | #12141A | #FFFFFF |
| #141720 | option tiles (StartQuizModal) | `surface-raised` → `bg-surface-raised` | #141720 | #FBFAF7 |
| #161922 | elevated controls (`bg-[#161922]`, `/50`, `hover:bg-[#161922]`) | `elevated` → `bg-elevated` | #161922 | #F3F2EE |
| #181B23 | hover background | `surface-hover` → `hover:bg-surface-hover` | #181B23 | #ECEAE4 |
| #1A1D27 | subtle fill (QuestionCard) | `subtle` → `bg-subtle` | #1A1D27 | #EFEDE7 |
| #1A1E2A | hover/fill on elevated items | `elevated-hover` → `bg-elevated-hover` | #1A1E2A | #E9E6DF |
| #222838 | strong hover (ExamScoreReport) | `elevated-active` → `hover:bg-elevated-active` | #222838 | #E1DDD4 |
| #1F2430 | default borders, track fills (`border-[#1F2430]`, `bg-[#1F2430]`, `hover:bg-[#1F2430]`) | `line` → `border-line`, `bg-line` | #1F2430 | #E3E0D8 |
| #262B36 | modal border (StartQuizModal) | `line-soft` → `border-line-soft` | #262B36 | #E6E3DB |
| #2A3244 | strong border / hover bg (QuestionCard, JsonImportModal) | `line-strong` → `border-line-strong`, `hover:bg-line-strong` | #2A3244 | #D5D1C7 |
| #374151 | checkbox border | `line-gray` → `border-line-gray` | #374151 | #C9CDD4 |
| #4B5563 | unselected radio border | `line-gray-strong` → `border-line-gray-strong` | #4B5563 | #9CA3AF |
| #384050 | hover border on tiles | `line-hover` → `hover:border-line-hover` | #384050 | #C2BDB1 |
| #1F2937 | scrollbar thumb (index.css only) | `scrollbar` → `var(--color-scrollbar)` | #1F2937 | #D6D3CB |
| #F3F4F6 | headings / strongest text | `fg-strong` → `text-fg-strong` | #F3F4F6 | #111318 |
| #E5E7EB | bright text / hover text | `fg-bright` → `text-fg-bright` | #E5E7EB | #1F2430 |
| #D1D5DB | body text | `fg` → `text-fg` | #D1D5DB | #2A2E37 |
| #9CA3AF | secondary text | `fg-muted` → `text-fg-muted` | #9CA3AF | #575D6B |
| #6B7280 | tertiary text | `fg-subtle` → `text-fg-subtle` | #6B7280 | #6E7380 |
| #C5A059 | gold FILL / border / ring / shadow / gradient-from / focus ring / `accent-*` / `fill-*` / selection bg / scrollbar hover | `accent` → `bg-accent`, `border-accent`, `ring-accent`, `shadow-accent/20`, `from-accent`, `focus:ring-accent/50`, `accent-accent`, `fill-accent` | #C5A059 | #C5A059 |
| #DFB76C | gold hover FILL / gradient-to / legend dot (`hover:bg-[#DFB76C]`, `to-[#DFB76C]`, `bg-[#DFB76C]/60`) | `accent-hover` → `hover:bg-accent-hover`, `to-accent-hover`, `bg-accent-hover/60` | #DFB76C | #DFB76C |
| #C5A059 | gold TEXT (`text-[#C5A059]`, incl. Sun icon, checkbox `text-`) | `accent-fg` → `text-accent-fg` | #C5A059 | #8A6A24 |
| #DFB76C | bright gold TEXT (`text-[#DFB76C]`, `hover:text-`, `group-hover:text-`, `selection:text-`) | `accent-fg-strong` → `text-accent-fg-strong` | #DFB76C | #7A5C1C |

Mechanical rule for the implementer: in every class, replace `[#HEX]` with the token from the table and keep all variant prefixes (`hover:`, `focus:`, `group-hover:`, `selection:`) and opacity suffixes (`/30`) exactly as they are. Two hex values need a role decision. For #0A0B0E, use `canvas` for backgrounds and `on-accent` for text, or for a dot sitting on a gold fill. For #C5A059 and #DFB76C, use `accent` / `accent-hover` for non-text utilities and `accent-fg` / `accent-fg-strong` for `text-*`.

### Status color light defaults (decision 3)

Write the light class first, then `dark:` plus the original class, unchanged:

| Current (dark) class | Light default to prepend |
|---|---|
| `text-emerald-300`, `text-emerald-400` | `text-emerald-700` |
| `text-rose-300`, `text-rose-400` | `text-rose-700` |
| `text-amber-300`, `text-amber-400` | `text-amber-700` |
| `bg-emerald-950/NN`, `bg-rose-950/NN`, `bg-amber-950/NN` (any opacity) | `bg-emerald-50` / `bg-rose-50` / `bg-amber-50` |
| `from-rose-950/20` | `from-rose-50` |
| `border-emerald-700/60`, `border-emerald-800/60`, `border-emerald-800`, `border-emerald-900/60` | `border-emerald-300` |
| `border-rose-700/60`, `border-rose-800`, `border-rose-900/40`, `border-rose-900/60` | `border-rose-300` |
| `border-amber-700/60` | `border-amber-300` |

Example: `'border-emerald-500/80 bg-emerald-950/30'` becomes `'border-emerald-500/80 bg-emerald-50 dark:bg-emerald-950/30'`.

## Per-file inventory (from reading the files)

- `index.html`: `<html class="dark">` stays. Body uses `bg-[#0A0B0E] text-[#D1D5DB] selection:bg-[#C5A059]/30 selection:text-[#DFB76C]`. Add the inline theme script.
- `src/index.css`: body `background-color: #0A0B0E; color: #D1D5DB`, and the scrollbar track, thumb, and thumb hover (#0A0B0E, #1F2937, #C5A059).
- `src/App.tsx`: `isDark` init (L60-65), class effect (L74-81), and hex classes: #0A0B0E (bg and on-accent text), #12141A, #161922, #181B23, #1F2430, #C5A059 (bg, /10, border /30, /40, /50, text), #DFB76C (text, hover text), #9CA3AF, #D1D5DB, #F3F4F6.
- `src/components/Navbar.tsx`: #0A0B0E/90, #12141A, #1F2430 (bg and border), #181B23, #C5A059 (bg, /10, /20, /30, /40, /50, focus ring /50, shadow /30, text), #DFB76C, #E5E7EB, #F3F4F6, #D1D5DB, #9CA3AF, #6B7280, and #0A0B0E as on-accent text. Toggle button at L236-243: Sun `text-[#C5A059]` → `text-accent-fg`, Moon `text-[#9CA3AF]` → `text-fg-muted`.
- `src/components/MobileBottomBar.tsx`: #0A0B0E/95, #12141A, #161922, #1F2430, #C5A059 (bg, shadow /20, /50, hover border /40), #DFB76C (hover bg, text), #D1D5DB, and #0A0B0E as on-accent text. The inline `style={{ width }}` has no colors.
- `src/components/QuestionCard.tsx`: #0E1015/70, #12141A, #161922, #1A1D27, #1A1E2A, #1F2430, #2A3244, #C5A059 (bg, /10, border, /30, /40, ring /40, shadow /20, text), #DFB76C, #E5E7EB, #F3F4F6, #D1D5DB, #9CA3AF, on-accent. Status: emerald/rose/amber 300, 400, 700/60, and 950/30, /60, /80.
- `src/components/QuestionDrawer.tsx`: #0E1015, #12141A, #161922, #1A1E2A, #1F2430, #C5A059 (bg, /15, /20, border, /50, ring, fill, shadow, text), #DFB76C (hover bg, /60, hover text, text), #F3F4F6, #D1D5DB, #9CA3AF, #6B7280, on-accent. Its status classes are all solid fills or 500 borders, so they stay unchanged.
- `src/components/JsonImportModal.tsx`: #0E1015, #12141A, #161922, /50, #1F2430 (bg and border), #2A3244 hover bg, #C5A059 (bg, /10, /15, /20, border, focus ring, shadow, text), #DFB76C, #F3F4F6, #D1D5DB, #9CA3AF, on-accent. Status: `bg-emerald-950/40 border-emerald-800 text-emerald-300`, and the same for rose.
- `src/components/StartQuizModal.tsx`: #050608/80, #0A0B0E (check each: the radio dot at L154 is on-accent), #0E1015, #141720, #161922, #1F2430, #262B36, #374151, #4B5563, #384050, #C5A059 (bg, /10, /15, border, /30, /80, focus ring /50, `accent-`, shadow /10, /20, gradient from, text), #DFB76C (gradient to, text), #E5E7EB, #F3F4F6, #D1D5DB, #9CA3AF, #6B7280, on-accent.
- `src/components/ExamScoreReport.tsx`: #12141A, #161922, /50, #1A1E2A, #222838, #1F2430, #C5A059 (bg, border /40, gradient from /15, shadow /20, /30, text), #DFB76C, #F3F4F6, #D1D5DB, #9CA3AF, #6B7280, on-accent, gradient `to-[#12141A]`. Status: `bg-emerald-950/20`, `border-emerald-900/60`, `text-emerald-400`, `from-rose-950/20`, `bg-rose-950/20`, `border-rose-900/40`, `/60`, `text-rose-400`.
- `src/components/FlashcardView.tsx`: #12141A, #161922, #1F2430, #C5A059 (/15, /25, border /30, /40), #DFB76C (text, group-hover), #F3F4F6, #D1D5DB, #9CA3AF. Status: `bg-emerald-950/20`, `/80`, `border-emerald-700/60`, `800/60`, `text-emerald-300`, `400`.

## Verification commands (from package.json; the project uses bun)

- Type check: `bun run lint` (runs `tsc --noEmit`). It must exit 0.
- Production build: `bun run build` (runs `vite build`). It must exit 0. The Tailwind v4 Vite plugin fails the build on unknown `@theme` or `@custom-variant` syntax.
- Leftover hex check (completeness aid, not proof of behavior): `Select-String -Path src/App.tsx,src/components/*.tsx,index.html -Pattern '\[#[0-9A-Fa-f]{3,8}\]'` must return nothing.
- CSS output check: after the build, `Select-String -Path dist/assets/*.css -Pattern '\.dark'` must match. This shows the `.dark` token overrides and the `dark:` variant rules were emitted.
- Per the user ("actually don't run"), do NOT start `bun run dev` or `bun run preview` and do not open a browser. Assumption: that phrase forbids running the app, not static checks. No test framework exists, and adding one is out of scope for a styling change. Lint plus build are the verification gates.

---

- [ ] 1. Add the theme foundation to `src/index.css`. After `@import "tailwindcss";`, add `@custom-variant dark (&:where(.dark, .dark *));`. Extend the existing `@theme` block with every `--color-*` token from the mapping table at its LIGHT value (keep `--font-sans`). In `@layer base`, add a `.dark { ... }` rule that sets every token to its DARK value. Change the `body` rule to `background-color: var(--color-canvas); color: var(--color-fg);`. Change the scrollbars to `var(--color-canvas)` (track), `var(--color-scrollbar)` (thumb), and `var(--color-accent)` (thumb hover). Update the "Sophisticated Dark" comment to a neutral one.
      Files: src/index.css
      Verify: `bun run build` exits 0. The app still looks the same at this point because no markup uses the tokens yet.

- [ ] 2. Add flash-free theme initialization and persistence. In `index.html` `<head>`, before the font links, add an inline non-module `<script>`. Inside try/catch it reads `localStorage.getItem('theme')`. If the value is `'dark'` or `'light'`, use it; otherwise use `matchMedia('(prefers-color-scheme: dark)').matches`. Then call `document.documentElement.classList.toggle('dark', isDark)` and set `document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'`. Keep `<html lang="en" class="dark">`. Change the body classes to `bg-canvas text-fg antialiased selection:bg-accent/30 selection:text-accent-fg-strong`. In `src/App.tsx`, replace the `isDark` initializer (L60-65) with `typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true`. Extend the existing dark-mode effect (L74-81) to use `classList.toggle('dark', isDark)`, set `style.colorScheme`, and call `localStorage.setItem('theme', isDark ? 'dark' : 'light')` inside try/catch. Change `onToggleTheme` (L444) to the functional form `() => setIsDark(d => !d)`.
      Files: index.html, src/App.tsx
      Verify: `bun run lint` and `bun run build` both exit 0.

- [ ] 3. Convert `src/App.tsx` and the shell components to tokens using the mechanical rule and the mapping table. In `Navbar.tsx`, also add `aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}` to `#toggle-theme-btn` and keep `title`. Map the Sun icon to `text-accent-fg` and the Moon icon to `text-fg-muted`.
      Files: src/App.tsx, src/components/Navbar.tsx, src/components/MobileBottomBar.tsx
      Verify: `bun run lint` and `bun run build` exit 0. The leftover-hex check returns nothing for these three files.

- [ ] 4. Convert the quiz and modal components to tokens, and apply the status light-default rule from the status table wherever emerald/rose/amber 300/400/700/800/900/950 classes appear, including inside ternary and `let` style strings such as `containerStyle` and `badgeStyle` in QuestionCard. Leave the classes listed in decision 3 unchanged.
      Files: src/components/QuestionCard.tsx, src/components/QuestionDrawer.tsx, src/components/JsonImportModal.tsx, src/components/StartQuizModal.tsx, src/components/ExamScoreReport.tsx, src/components/FlashcardView.tsx
      Verify: `bun run lint` and `bun run build` exit 0. The leftover-hex check over `src/App.tsx`, `src/components/*.tsx`, and `index.html` returns nothing. `Select-String -Path dist/assets/*.css -Pattern '\.dark'` matches.

- [ ] 5. Do a final consistency pass. Confirm `git diff --stat` touches only `index.html`, `src/index.css`, `src/App.tsx`, and `src/components/*.tsx`, with nothing under `src/data/`. Spot-check in the diff that every replaced dark class maps to a token whose `.dark` value equals the original hex, which keeps dark mode the same as before. Spot-check that every status class kept its original form behind `dark:`.
      Files: none (review only)
      Verify: `bun run lint` and `bun run build` exit 0. Do not start the dev server.

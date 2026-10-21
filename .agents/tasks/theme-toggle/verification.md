# Verification: theme toggle (iteration 1)

No review.json existed, so this was the first iteration. I implemented plan.md steps 1 through 5.

## Environment note
`bun` is not installed here: it is not on PATH, and `where.exe bun` and `~/.bun/bin` found nothing. `node_modules` was already present, so I ran the same package.json scripts through npm. They invoke the same `tsc --noEmit` and `vite build`.

## Commands and results
| Command | Result |
|---|---|
| `npm run lint` (`tsc --noEmit`) | exit 0, no errors |
| `npm run build` (`vite build`) | exit 0, built in ~8s. The only warning is the existing >500 kB chunk size warning. |
| `Select-String -Path src/App.tsx,src/components/*.tsx,index.html -Pattern '\[#[0-9A-Fa-f]{3,8}\]'` | 0 matches. No hardcoded hex classes are left. |
| Built CSS: check that all 27 `--color-*` tokens are in `:root,:host` (light) | all present |
| Built CSS: `.dark{--color-canvas:#0a0b0e;...}` override | present |
| Built CSS: `:where(.dark` custom variant and `dark:` rules | present (27 unique `dark:` utilities) |
| `git status --short` | only index.html, src/index.css, src/App.tsx, src/components/*.tsx changed. Nothing under src/data/ changed. |

I did not start a dev server or preview, and I did no visual check in a browser, per the user's request ("actually don't run").

## Code-inspection checks
- Dark theme stays the same. Each `.dark` token value is the exact hex it replaced. Each status class (emerald/rose/amber 300/400/700/800/900/950) is kept verbatim behind `dark:`.
- Light theme contrast. Body text #2A2E37, muted #575D6B (~6.6:1), and subtle #6E7380 (~4.7:1) sit on white/#F7F6F2 surfaces. Gold text uses darker light values: `accent-fg` #8A6A24 (~5:1) and `accent-fg-strong` #7A5C1C (~6:1). Gold fills keep #C5A059 with `on-accent` #0A0B0E text (~8:1). Status text uses `*-700` on `*-50` with `*-300` borders.
- Classes left unchanged: `text-white` (only on solid emerald/rose-600 fills), the `bg-black/70` overlays, and the solid status fills and 500 borders. These are readable in both themes. No inline-style colors exist.

## Changed files
- `src/index.css`: added `@custom-variant dark` and `@theme` color tokens (light defaults), plus a `.dark` override with the original dark values. Body and scrollbars now use these tokens.
- `index.html`: added an inline pre-paint script that applies the saved theme from localStorage, or falls back to prefers-color-scheme. It also sets `color-scheme`. Body classes now use tokens.
- `src/App.tsx`: `isDark` now starts from the `<html>` class. The effect toggles the class, sets `colorScheme`, and persists the choice to localStorage (in a try/catch). The toggle uses a functional update. All colors now use tokens.
- `src/components/*.tsx` (all 8 components): hex classes are replaced with tokens. Status classes got light defaults with a `dark:` original. The `#toggle-theme-btn` in Navbar now has an `aria-label`.

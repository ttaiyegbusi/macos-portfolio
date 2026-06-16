# Temitope Aiyegbusi — macOS Desktop Portfolio

An interactive portfolio that looks and behaves like a macOS desktop: a gradient wallpaper, a Liquid Glass dock, and fully draggable / resizable / minimizable app windows — with a pixel-close recreation of a Figma workspace as the centerpiece.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.
Typography is **IBM Plex Sans** (bundled locally as a variable font — no external font requests).

---

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
```

Production build & preview:

```bash
npm run build      # type-checks (strict) + bundles to dist/
npm run preview    # serves the production build
```

Requires Node 18+.

---

## What's inside

| Interaction | How |
|---|---|
| Open an app | Click its dock icon (Figma opens automatically on load) |
| Move a window | Drag its title bar (Figma: drag the tab bar) |
| Resize | Drag any edge or corner (8 handles, min/max clamped) |
| Minimize | Yellow traffic light — the window flies into its dock icon; click the icon to restore |
| Maximize / restore | Green traffic light, or double-click the title bar |
| Focus | Click anywhere on a window; dock dots show open (faint) vs focused (strong) |
| Pan the Figma canvas | Click-drag anywhere on the canvas (grab cursor), or scroll/trackpad |
| Jump to a frame | Click a page in the left sidebar **or a tab** — the canvas glides to that frame |
| Collapse sidebars | The panel icon in the left sidebar header hides both; a floating glass handle brings them back |
| Copy email | The copy icon on the mail tile |

Apps in the dock: **Finder** (about/resume/case studies/contact), **Projects** (case-study cards), **Figma** (the portfolio canvas), **Notes** (bio & skills), **Dribbble** (shots grid), plus a decorative Trash.

---

## File structure

```
macos-portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js          # design tokens from dashboard_design_extraction.md
├── postcss.config.js
├── tsconfig*.json
├── public/
│   ├── wallpaper.jpg           # your desktop image
│   ├── favicon.svg
│   └── fonts/                  # IBM Plex Sans variable fonts (local @font-face)
└── src/
    ├── main.tsx / App.tsx      # entry; MotionConfig honors reduced-motion
    ├── index.css               # @font-face, tokens, glass recipes, window transitions
    ├── types.ts                # AppId, Bounds, WindowState, AppDefinition
    ├── data/
    │   └── apps.tsx            # app registry: dock order, icons, default/min sizes
    ├── context/
    │   └── WindowManager.tsx   # reducer: open/close/minimize/maximize/focus/bounds + z-order
    └── components/
        ├── Desktop.tsx         # wallpaper + windows layer + dock
        ├── Dock.tsx            # Liquid Glass tray, tooltips, indicators, minimize target refs
        ├── AppWindow.tsx       # drag, 8-way resize, minimize-to-dock & open/close animations
        ├── WindowControls.tsx  # traffic lights with hover glyphs
        ├── icons/AppIcons.tsx  # Finder/Projects/Figma/Notes/Dribbble/Trash SVGs
        └── apps/
            ├── NotesApp.tsx · DribbbleApp.tsx · FinderApp.tsx · ProjectsApp.tsx
            └── figma/
                ├── FigmaApp.tsx        # tab-bar chrome + sidebars + collapse logic
                ├── FigmaCanvas.tsx     # clamped pan: pointer drag, wheel, animated focus
                ├── CanvasContent.tsx   # hero profile card, social tiles, headline, frames
                ├── LeftSidebar.tsx · RightSidebar.tsx
                └── glyphs.tsx          # X/Dribbble/Medium/LinkedIn marks
```

## Design system

All colors, radii, shadows, and spacing come from `dashboard_design_extraction.md`:
window body `#F1F1F1`, chrome `#F6F6F6`, borders `#EDEDED/#E6E6E6/#F0F0F0`, the muted text scale (`#020202 → #C1C1C1`), traffic lights `#EA6B65 / #F3BF52 / #5EC550`, and the dock's glass recipe (`rgba(255,255,255,0.18)` + `blur(24px) saturate(155%)` + white border + inset highlights). The wallpaper uses your image with the extracted gradient as a loading fallback.

**Typography rule:** IBM Plex Sans, everywhere. It's first in the Tailwind `font-sans` stack and served from `public/fonts/` via `@font-face` (weights 100–700 through the variable axis).

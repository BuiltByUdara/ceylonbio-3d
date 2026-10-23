# CeylonBio 3D

A Next.js 14 / TypeScript learning studio for Sri Lankan A/L Biology.

## Run locally

```sh
npm install
npm run dev
```

Visit http://localhost:3000. Use `npm run typecheck` and `npm run build` for validation. Production builds export static files to `out/`; deploy that folder to static hosting.

## Structure

- `app/page.tsx`: responsive workspace, syllabus outline, searchable resource hub.
- `components/Viewer.tsx`: lazy 3D loading, WebGL detection, render error boundary, accessible structure selectors, animation and camera controls.
- `components/Scene.tsx`: procedural heart, brain regions, double helix and phospholipid bilayer using React Three Fiber and Drei.
- `lib/data.ts`: typed syllabus and bilingual structure data.
- `lib/store.ts`: Zustand learning session state.

The models are simplified educational schematics inspired by anatomy explorers, created procedurally without OrganUI assets or a proprietary integration. They are not medically precise models. Syllabus topic outlines follow the requested unit organization. Sinhala terminology should receive teacher review before classroom publication. The language toggle switches structure terminology; structure details remain in English and the selected title shows both languages.

Resources are original concise study aids, not official resource books. Downloads are generated locally as TXT notes and SVG schematic diagrams. No login, server storage, or progress persistence is implied. Model exploration progress lasts for the browser session. Models for topics beyond the four included examples are marked as in development.

The app loads Three.js only in the client, limits pixel density, and provides text-based structure exploration when WebGL cannot initialize. CSS honors reduced-motion preferences and model animation starts paused for those users. All structure selections are available as keyboard-accessible buttons. Fonts use system fallbacks when Google Fonts is unavailable.

## Dependency status

The requested Next.js 14 line has security advisories reported by npm audit, including critical server advisories. This application uses a static export so its production deployment does not require a Next.js server. Serve `out/` with a static host; do not expose `next dev` publicly. Before adopting a server deployment, migrate to a patched supported Next.js release. The audit also reports development-tool dependency advisories in Tailwind 3's dependency tree.

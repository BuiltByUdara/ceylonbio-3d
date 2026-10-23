# CeylonBio 3D

A Next.js 14 / TypeScript learning studio for Sri Lankan A/L Biology.

## Run locally

```sh
npm install
npm run dev
```

Visit http://localhost:3000. Run `npm run check` for source types, regression tests and formatting, then `npm run build` for production validation. Production builds export static files to `out/`; deploy that folder to static hosting. `npm start` serves that export locally with support for direct page URLs.

## Structure

- `app/page.tsx`: Explore entry point; dedicated routes at `/explore`, `/syllabus`, `/resource-hub`, and `/life-sciences`.
- `components/layout/`: persistent app shell, navigation, page headings and footer.
- `features/`: separate Explore, Syllabus, Resources and Life sciences features.
- `components/Viewer.tsx`: lazy 3D loading, WebGL detection, render error boundary, accessible structure selectors, animation and camera controls.
- `components/Scene.tsx`: procedural heart, brain regions, double helix and phospholipid bilayer using React Three Fiber and Drei.
- `lib/models.ts` and `lib/syllabus.ts`: typed biology models, bilingual structures and syllabus records.
- `lib/store.ts`: Zustand learning session state.
- `tests/`: regression tests for resource filtering/downloads, data consistency, demo generation and model-selection state.

See [the architecture guide](docs/architecture.md) for component boundaries, state ownership and instructions for adding pages, models, resources and life science tools. Use `npm run format` to apply the project's formatting conventions.

The models are simplified educational schematics inspired by anatomy explorers, created procedurally. The separate Life sciences lab integrates OrganUI source and its attributed heart asset. They are not medically precise models. Syllabus topic outlines follow the requested unit organization. Sinhala terminology should receive teacher review before classroom publication. The language toggle switches structure terminology; structure details remain in English and the selected title shows both languages.

Resources are original concise study aids, not official resource books. Downloads are generated locally as TXT notes and SVG schematic diagrams. No login, server storage, or progress persistence is implied. Model exploration progress lasts for the browser session. Models for topics beyond the four included examples are marked as in development.

The app loads Three.js only in the client, limits pixel density, and provides text-based structure exploration when WebGL cannot initialize. CSS honors reduced-motion preferences and model animation starts paused for those users. All structure selections are available as keyboard-accessible buttons. Fonts use system fallbacks when Google Fonts is unavailable.

## Dependency status

The requested Next.js 14 line has security advisories reported by npm audit, including critical server advisories. This application uses a static export so its production deployment does not require a Next.js server. Serve `out/` with a static host; do not expose `next dev` publicly. Before adopting a server deployment, migrate to a patched supported Next.js release. The audit also reports development-tool dependency advisories in Tailwind 3's dependency tree.

## OrganUI life sciences lab

The Life sciences navigation tab uses adapted OrganUI source for the heart viewer, ECG trace, molecule viewer and image viewer. Source is vendored in `components/organui/`; its MIT licence is retained there. UI primitives are adapted to the project's React 18 / Tailwind 3 setup using Base UI. Upstream: https://organui.com/ and https://github.com/organui/organui (registry retrieved 2026-10-23).

The heart uses OrganUI's pinned remote GLB and preserves BodyParts3D attribution and CC BY 4.0 links. Loading it requires network access; the viewer provides retry and error states. Existing procedural models in Explore remain separate. The molecular example uses original idealised water coordinates, the ECG is synthetic, and the image viewer uses a generated synthetic phantom with 12 slices, not patient images. Source components support loading other molecular and imaging data, but no patient upload or diagnostic workflow is provided.

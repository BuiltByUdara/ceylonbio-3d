# Project architecture

## Where code belongs

| Directory                 | Responsibility                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `app/`                    | Next.js route entry points, route metadata, root layout, loading and error boundaries. |
| `components/layout/`      | Persistent sidebar, header, footer, page heading and route transitions.                |
| `components/`             | UI used across features and the procedural 3D viewer.                                  |
| `features/explore/`       | Model picker and discovery page composition.                                           |
| `features/syllabus/`      | Syllabus cards and model links.                                                        |
| `features/resources/`     | Resource types/catalog, filtering, file generation, download adapter and cards.        |
| `features/life-sciences/` | Tool selection, independently loaded panels and original synthetic sample data.        |
| `components/organui/`     | Adapted third-party source; retain its licence and attribution.                        |
| `lib/`                    | Shared navigation, biology model data, syllabus records and session state.             |
| `tests/`                  | Node regression tests for business logic and data relationships.                       |

Routes compose features; they do not switch between all pages inside one component. The root layout owns the persistent app shell. Shared UI should accept typed props; feature-specific UI stays beside its feature. Avoid creating abstractions until more than one use or a clear responsibility justifies them.

## Rendering and state

Use server components for static composition. Add `"use client"` at an interaction boundary that needs hooks, event handlers or browser APIs. Heavy WebGL viewers load dynamically in client components. The anatomy metadata is separate from its renderer, so displaying structure labels does not eagerly load Three.js.

`lib/store.ts` holds only session state that spans components or routes: language, active model, selected structure, visited models and expanded syllabus unit ID. Subscribe to individual fields with selectors. Keep temporary UI state near its owner: mobile navigation belongs to the shell, search and filters to Resources, and viewer controls to their panel. State is in memory; it is not persisted across reloads.

Units use stable numeric IDs, not array indexes. Model IDs and resource categories are TypeScript unions. Add descriptive metadata to records rather than maintaining separate arrays whose positions must match.

## Adding content

### Biology model

1. Add its ID and typed metadata in `lib/models.ts`, including a valid syllabus unit ID.
2. Add bilingual structure records and its renderer in `components/Scene.tsx`.
3. Add its icon to the typed map in `features/explore/ModelPicker.tsx`.
4. Run `npm run check`; data tests validate syllabus membership and unique structure IDs.

### Study resource

Add a `StudyResource` record in `features/resources/data.ts`. Text downloads use its `text`. Diagrams explicitly set `diagram: "heart"` or `"dna"`; titles do not determine the file format. Add new diagram rendering in `download.ts` when needed. `createResourceFile` is pure; `downloadResource` handles the browser Blob and link lifecycle. Escape dynamic SVG text through the provided XML helper.

### Life science tool

Create a panel in `features/life-sciences/`, dynamically import it into the tool registry, and add its label. Keep sample-data generation in a pure module. Clearly label synthetic examples and preserve any dataset/model credits. The tabs support arrow keys, Home and End with a single tab stop.

### Page

Add a route under `app/` and a feature under `features/`. Register its path in `lib/navigation.ts`, then add a heading and navigation icon to the typed maps. A type error identifies missing map entries. `/` remains an alias for Explore. Navigation links use Next.js `Link`; action buttons change local state.

## Quality checks

```sh
npm run check         # source types, regression tests, formatting
npm run build         # Next.js route validation and static export
npm start             # serve the generated out/ directory locally
```

`npm run format` applies formatting. Vendored OrganUI files are excluded from formatting to keep upstream changes reviewable. Type checking uses `tsconfig.check.json` so a concurrent development server cannot remove generated `.next/types` files during the check. Next.js validates its own generated route types during the build. Tests compile through `tsconfig.test.json` into ignored `.test-build/`, then use Node's built-in test runner; no test framework dependency is required.

The regression tests cover pure logic and state transitions. They do not replace browser verification of WebGL rendering, responsive layout, keyboard focus or download behavior. Check those when changing interactive UI.

## Deployment and third-party code

Production is a static export (`out/`). `scripts/serve.mjs` resolves extensionless routes to their exported HTML files, so direct page visits work. A hosted deployment needs the same clean-URL support. Run development and build commands separately if Windows reports a locked `.next/trace`; do not stop unrelated Node processes or delete source folders to resolve it.

OrganUI code is adapted to React 18 and Tailwind 3 via `components/organui/primitives.tsx`. The heart model metadata is extracted into `heart-model.ts`, and `heart.tsx` re-exports it for compatibility. Keep changes to vendor files small and document them here. The remote heart GLB retains BodyParts3D attribution and CC BY 4.0 links. Dependency upgrades and medical validation are separate work from this structural refactor.

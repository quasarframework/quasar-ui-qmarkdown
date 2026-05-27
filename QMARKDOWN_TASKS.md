# QMarkdown Task List

Last Updated: 2026-05-19

## Repo Identity

- Repo: `quasar-ui-qmarkdown`
- Branch: `v3-beta`
- Target version: `3.0.0-beta.0`
- Base branch: `origin/dev`
- Current `@quasar/app-vite` version: `3.0.0-beta.15`
- Target `@quasar/app-vite` version verified as published: `yes`

## Completed

- [x] Branch created from the correct base
- [x] Repo moved to `packages/` layout
- [x] Root workspace migrated to pnpm
- [x] Root `.npmrc` aligned with the shared standard
- [x] Root scripts aligned with the QCalendar-style standard
- [x] `oxlint` added at the root
- [x] `oxfmt` added at the root
- [x] Package-local ESLint configs/scripts removed in favor of `oxlint`
- [ ] Package-local Prettier configs/scripts removed in favor of `oxfmt`
- [ ] Legacy `.sass` files converted to `.scss` where encountered
- [x] Root `ci:publish` and `ci:publish:beta` scripts aligned
- [x] App extension package migrated to `@quasar/app-vite`
- [x] Old webpack-only app-extension path removed from the migration target
- [x] Docs package linked to the workspace UI package
- [x] Dev package linked to the workspace UI package
- [x] Shared pnpm build approvals recorded
- [ ] Real tests added

## High Priority

- [x] UI package builds successfully
- [ ] Docs package builds successfully
- [ ] Dev package builds successfully
- [ ] Real tests exist and run at the root
- [ ] Coverage baseline captured and expanded beyond utility-only coverage
- [ ] Runtime/composable logic audit completed with regression tests for discovered bugs
- [ ] Root typings are strong enough for IDE use
- [ ] Root and subpath consumer type smoke checks pass
- [ ] External consumer / IDE verification completed for typing-sensitive fixes
- [ ] Docs/API JSON generation audited against the runtime source
- [ ] API drift warnings/checks enabled and clean
- [ ] Root lint command is clean with no warnings
- [x] Root format check is clean
- [ ] CI workflow exists

## Medium Priority

- [ ] Port `packages/docs` to a real Quasar CLI Vite 3 project shape
- [ ] Isolate and resolve the `packages/dev` Sass failure under `@quasar/app-vite@3.0.0-beta.15`
- [ ] Update READMEs to the new `packages/` layout and pnpm-first guidance
- [ ] Clean remaining legacy scaffolding and config drift
- [ ] Remove remaining Prettier configs/dependencies in favor of `oxfmt`
- [ ] Convert remaining legacy `.sass` files to `.scss`
- [ ] Review the UI build system for parity with newer shared practices
- [x] Remove CJS output from the v3 UI package and publish an ESM-only package surface
- [ ] Review build-step ordering and failure propagation for determinism
- [ ] Review package entrypoint semantics at the root package surface
- [ ] Decide CI policy for API drift warnings vs failures
- [ ] Replace `vitest --passWithNoTests` with real test coverage

## Root Lint Warnings To Resolve

- [ ] `packages/ui/types/types.d.ts`
  Replace wrapper type `String` with `string`
- [ ] `packages/ui/build/script.javascript.js`
  Remove unused `babelConfig`
- [ ] `packages/ui/build/script.css.js`
  Remove unnecessary single-item `Promise.all(...)`
- [ ] `packages/ui/src/components/QMarkdown.js`
  Remove unused watcher/click callback params
- [ ] `packages/ui/src/util/extendLink.js`
  Replace unused short-circuit expressions with explicit conditionals
- [ ] `packages/docs/src/components/page-parts/releases/PackageReleases.vue`
  Remove unnecessary escaped backticks

## Remaining Prettier Footprint To Remove

- [ ] `packages/ui/package.json`
  Replace package-local `format` script that still calls `prettier`
- [ ] `packages/dev/package.json`
  Replace package-local `format` script and remove `prettier` dependency if no longer needed
- [ ] `packages/docs/package.json`
  Remove `prettier` dependency if no longer needed after docs migration
- [ ] Root/package `.prettierrc*` and `.prettierignore` files
  Re-evaluate which are still needed once package-local formatting no longer depends on Prettier

## Remaining Sass Footprint To Convert

- [ ] `packages/ui/src/QMarkdown.sass`
  Convert to `.scss` and update any importing entrypoints
- [ ] `packages/ui/src/index.sass`
  Convert to `.scss` and update any importing entrypoints
- [ ] `packages/ui/src/components/QMarkdown.sass`
  Convert to `.scss`
- [ ] `packages/ui/src/components/prism-theme.sass`
  Convert to `.scss`
- [ ] `packages/ui/src/components/quasar.variables.sass`
  Convert to `.scss`
- [ ] `packages/docs/src/components/DocsMenu.sass`
  Convert to `.scss`
- [ ] `packages/docs/src/css/app.sass`
  Convert to `.scss`
- [ ] `packages/docs/src/css/markdown.sass`
  Convert to `.scss`
- [ ] `packages/docs/src/css/prism-theme.sass`
  Convert to `.scss`
- [ ] `packages/docs/src/css/quasar.variables.sass`
  Convert to `.scss`

## Deferred / Blocked

- [ ] Prompt API migration after a released `@quasar/app-vite` version supports the new contract
- [ ] Any Quasar/App Vite upstream fix needed for the current dev Sass failure

## Notes

- `pnpm --filter @quasar/quasar-ui-qmarkdown build` passes
- `pnpm run format:check` passes
- `pnpm run test` currently passes only because of `--passWithNoTests`
- `pnpm --filter docs build` is still blocked by the docs migration
- `pnpm --filter dev build` is still blocked by the Quasar Sass issue
- Validation commands:
  - `pnpm install`
  - `pnpm --filter @quasar/quasar-ui-qmarkdown build`
  - `pnpm --filter docs build`
  - `pnpm --filter dev build`
  - `pnpm run lint`
  - `pnpm run format:check`
  - `pnpm run test`

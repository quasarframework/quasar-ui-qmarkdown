# QMarkdown Audit

Initial Audit Date: 2026-05-19  
Last Updated: 2026-05-19

Task tracking companion: `QMARKDOWN_TASKS.md`

## Status Update

Completed this pass:

- Restructured the repo into a QCalendar-style workspace under `packages/`
  - `packages/ui`
  - `packages/app-extension`
  - `packages/docs`
  - `packages/dev`
- Migrated the root workspace to pnpm
  - added `pnpm-workspace.yaml`
  - added root `.npmrc` aligned with the QCalendar workspace
  - updated root `package.json` scripts, engines, and `packageManager`
  - added root `oxlint` / `oxfmt` tooling
  - removed package-local ESLint config artifacts and switched active linting to `oxlint`
  - generated `pnpm-lock.yaml`
  - approved required pnpm build scripts in `pnpm-workspace.yaml`
- Bumped the next release line to `3.0.0-beta.0`
- Rewired the UI build’s app-extension sync script for the new `packages/` layout
- Preserved `workspace:^` links for the app-extension dependency so local builds stop resolving unpublished versions from npm
- Migrated the app-extension metadata to `@quasar/app-vite@3.0.0-beta.15`
- Removed the webpack boot path from the app-extension and made the extension Vite-only
- Rewired the dev app to consume the workspace package instead of the old `ui2/qmarkdown2` placeholder

Verified this pass:

- `pnpm install`
  - passes after pnpm build-script approvals are recorded
- `pnpm --filter @quasar/quasar-ui-qmarkdown build`
  - passes
- `pnpm run lint`
  - passes

## High Priority Remaining Work

### 1. `packages/dev` still fails to build on `@quasar/app-vite@3.0.0-beta.15`

Current blocker:

- `pnpm --filter dev build`
- Fails in Quasar core Sass compilation:
  - `quasar/dist/quasar.sass`
  - `Error: [sass] Error: expected selector`
  - failing selector uses `:has(+ :is(...):is(` syntax

Assessment:

- This is no longer a QMarkdown import/export or TypeScript wiring issue.
- The dev app is down to an upstream Quasar/App Vite/Sass compatibility problem that needs isolated reproduction and comparison against a fresh Quasar CLI Vite 3 app.

### 2. `packages/docs` has not been migrated to Quasar CLI Vite 3 yet

Current blocker:

- `pnpm --filter docs build`
- Fails immediately with:
  - `This command must be executed inside a Quasar project folder.`

Root cause:

- The docs app still uses legacy webpack-era project shape and config:
  - `packages/docs/quasar.conf.js`
  - old wrapper imports like `quasar/wrappers`
  - custom webpack markdown loader pipeline in `packages/docs/build/*`

Assessment:

- This is the largest remaining migration item in the repo.
- The docs app needs a real port to `quasar.config.ts` / Quasar CLI Vite 3, not just dependency bumps.

### 3. QMarkdown root typings are still weak

Current state:

- The generated root declarations in `packages/ui/dist/types/index.d.ts` still expose `QMarkdown` as `ComponentOptions`
- There is no strong typed default plugin export surface comparable to the newer QCalendar work

Impact:

- Consumer IDE/TypeScript experience is weaker than it should be
- The dev app had to register `QMarkdown` directly with an explicit cast instead of getting a clean plugin type from the package root

### 4. The UI build system is still on the old stack

Current state:

- `packages/ui/build/*.js` remains CommonJS/Node-script driven
- bundling is still old Rollup-based code
- API/type generation is still based on the older `quasar-json-api` flow

Assessment:

- The repo structure now looks more like QCalendar, but the internal UI build pipeline is still much older.
- A future pass should decide whether QMarkdown should also move toward the newer Rolldown/TypeScript-style build orchestration used in QCalendar.

### 5. CI is missing

Current state:

- There is no `.github/workflows/run-vitest.yml`
- There are no root verification scripts comparable to QCalendar’s current setup

Assessment:

- After the dev/docs migration blockers are resolved, add at least:
  - `pnpm install --frozen-lockfile`
  - UI build
  - docs build
  - lint

## Medium Priority Cleanup

### 1. README and path drift

- Root and package READMEs still refer to the old flat layout (`/ui`, `/docs`, `/app-extension`)
- Many usage examples still mention Yarn-first commands

### 2. Legacy docs content drift

- The docs markdown still references both webpack and Vite installation guidance
- The migration story for beta `3.x` is not documented yet

### 3. Mixed legacy scaffolding

- Legacy dotfiles/config patterns still exist across packages:
  - old JS config files
  - old Quasar scaffolding text
  - inline `eslint-disable` comments that are now only textual leftovers

## Verification Snapshot

Commands run during this audit:

- `pnpm install`
- `pnpm approve-builds --all`
- `pnpm --filter @quasar/quasar-ui-qmarkdown build`
- `pnpm --filter dev build`
- `pnpm run lint`
- `pnpm --filter docs build`

Results:

- workspace install: passing
- UI package build: passing
- dev source lint: passing
- dev build: failing on Quasar Sass parsing
- docs build: failing because docs project has not been ported to the Quasar CLI Vite 3 project shape

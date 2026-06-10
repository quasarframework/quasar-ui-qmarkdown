---
title: Upgrade Guide
desc: Migrate to QMarkdown v3
keys: Help, upgrade, migration
related:
  - /getting-started/installation-types
  - /developing/using-qmarkdown
  - /other/releases
---

Use this guide to migrate from QMarkdown v2.x to QMarkdown v3.0.0 beta.

> QMarkdown v3 targets Vue 3, Quasar 2, and Quasar CLI Vite 3. If your app still uses Vue 2 or `@quasar/app-webpack`, migrate the app before installing QMarkdown v3.

> The information below is not exhaustive. Check the [Releases](/other/releases) page for the latest beta notes, and please open an issue or PR if something is missing.

## QMarkdown v3.0.0 Beta

QMarkdown v3 prepares the package for Quasar CLI Vite 3 and the shared app-extension workspace standard.

Important changes:

- The app extension is Vite-only and requires `@quasar/app-vite` >=3.0.0-beta.44.
- The webpack app-extension path is no longer supported.
- The package now uses ESM-first exports for Quasar/Vite consumers.
- UMD bundles remain available for CDN and CodePen examples.
- Source files are TypeScript and SCSS.
- Documentation examples now include GitHub source and CodePen playground links through Q-Press.
- Repository tooling now uses pnpm, oxlint, oxfmt, Vitest, and Rolldown.

## Requirements

| Area                          | QMarkdown v3 beta         |
| ----------------------------- | ------------------------- |
| Vue                           | Vue 3                     |
| Quasar                        | Quasar 2                  |
| Quasar CLI                    | `@quasar/app-vite` >=3.0.0-beta.44 |
| App extension                 | Vite only                 |
| Node.js for this repo and CI  | `>=22.13`                 |
| Package manager for this repo | `pnpm >=11.5.0`           |

## Installing the beta

While QMarkdown v3 is in beta, install packages from the `beta` dist tag.

```tabs
<<| bash App Extension |>>
quasar ext add @quasar/qmarkdown@beta
<<| bash pnpm |>>
pnpm add @quasar/quasar-ui-qmarkdown@beta
<<| bash bun |>>
bun add @quasar/quasar-ui-qmarkdown@beta
<<| bash yarn |>>
yarn add @quasar/quasar-ui-qmarkdown@beta
<<| bash npm |>>
npm install @quasar/quasar-ui-qmarkdown@beta
```

When QMarkdown v3 is released as stable, remove the `@beta` tag from those commands.

## App Extension Changes

The QMarkdown app extension now targets Quasar CLI Vite only.

- Install it only in apps using `@quasar/app-vite` >=3.0.0-beta.44.
- The extension registers the Vite boot file only.
- The extension remains the recommended install path for Quasar apps because it also configures Vue template handling for markdown content.
- The optional markdown raw importer still lets you import `*.md` files as strings when enabled during install.

If you maintain your own boot file, import `defineBoot` from `#q-app`:

```ts
import { defineBoot } from "#q-app";
import Plugin from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

export default defineBoot(({ app }) => {
  app.use(Plugin);
});
```

## Direct UI Package Usage

Compiled package imports are the recommended path:

```ts [twoslash]
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";

QMarkdown
// ^?
```

Import the component stylesheet alongside the component:

```ts
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
```

Direct `src/` imports are still available for advanced use cases. With Quasar CLI Vite 3, dependency transpilation is automatic, so no additional transpile-dependency configuration is needed.

```ts
import Plugin from "@quasar/quasar-ui-qmarkdown/src/index";
import "@quasar/quasar-ui-qmarkdown/src/index.scss";
```

## Markdown Rendering Notes

QMarkdown still relies on Vue preserving markdown content inside `<q-markdown>` tags. If you install manually instead of using the app extension, keep this compiler option in your Quasar config:

```ts
build: {
  viteVuePluginOptions: {
    template: {
      compilerOptions: {
        isPreTag: (tag) => tag === "pre" || tag === "q-markdown" || tag === "QMarkdown",
      },
    },
  },
}
```

## CodePen And UMD Examples

The documentation examples use the UMD bundle when opening in CodePen.

If you maintain custom CodePen or script-tag examples, load the QMarkdown CSS and UMD bundle after Quasar:

```html
<link
  href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@3.0.0-beta.4/dist/index.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@3.0.0-beta.4/dist/index.umd.min.js"></script>
```

Then register the component from the browser global:

```js
app.component("QMarkdown", QMarkdown.QMarkdown);
```

## Contributor Tooling Changes

The QMarkdown repository now uses:

- `pnpm@11.4.0`
- Node.js `>=22.13`
- `oxlint` instead of ESLint
- `oxfmt` instead of Prettier
- Vitest for runtime and API-drift tests
- Rolldown for UI package builds

Use the existing scripts for local verification:

```bash
pnpm format:check
pnpm lint
pnpm test
pnpm build
pnpm typecheck
```

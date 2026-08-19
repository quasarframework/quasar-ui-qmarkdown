<!--
Release drafting notes:
- Lead with changes QMarkdown users feel in their apps: component behavior, app-extension behavior, public API, styling, compatibility, install, and migration notes.
- Include docs, CodePen, build tooling, dependency, or release-process changes only when they affect package consumers.
- Fixes should include the short commit id.
- Keep the summary short and concrete.
-->

# QMarkdown v4.2.1

Release date: 2026-08-19

## Summary

QMarkdown v4.2.1 improves Quasar CLI Vite integration by keeping the UI package out of
Vite dependency optimization. This ensures its Quasar imports use the application's runtime
instance.

## What's Changed

**Features:**

- None.

**Fixes:**

- `543f90f` Exclude the QMarkdown UI package from Vite dependency optimization when installed
  through the App Extension, preventing a separately optimized Quasar runtime.

**Maintenance:**

- `0bf15996` Refresh dependencies and the QPress documentation runtime.

## Breaking Changes

- None.

## Compatibility

- Node.js: `>=22.13`
- Quasar: `^2.25.0`
- Quasar App Vite target: `@quasar/app-vite@3.6.0`
- npm dist-tag: `latest`

## Installation

```bash
pnpm add @quasar/quasar-ui-qmarkdown
# or
bun add @quasar/quasar-ui-qmarkdown
# or
yarn add @quasar/quasar-ui-qmarkdown
# or
npm install @quasar/quasar-ui-qmarkdown
# or
quasar ext add @quasar/qmarkdown
```

Add a prerelease tag, such as `@beta`, only when intentionally publishing under that dist-tag.

## Documentation

- Docs: https://qmarkdown.netlify.app/
- Installation: https://qmarkdown.netlify.app/getting-started/installation-types
- Upgrade Guide: https://qmarkdown.netlify.app/other/upgrade-guide

## Full Changelog

https://github.com/quasarframework/quasar-ui-qmarkdown/compare/v4.2.0...v4.2.1

## Donations

If QMarkdown is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

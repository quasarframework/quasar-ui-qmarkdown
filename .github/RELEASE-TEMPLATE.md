<!--
Release drafting notes:
- Lead with changes QMarkdown users feel in their apps: component behavior, app-extension behavior, public API, styling, compatibility, install, and migration notes.
- Include docs, CodePen, build tooling, dependency, or release-process changes only when they affect package consumers.
- Fixes should include the short commit id.
- Keep the summary short and concrete.
-->

# QMarkdown v4.x.x

Release date: YYYY-MM-DD

## Summary

Short user-facing summary of what changed for QMarkdown component/app-extension users.

## What's Changed

**Features:**

- `commitid` Describe new component, app-extension, public API, styling, or integration behavior.

**Fixes:**

- `commitid` Describe the bug, who it affected, and what now works correctly.

**Maintenance:**

- `commitid` Include only consumer-relevant maintenance, such as package prep, compatibility updates, or dependency updates that users may notice.

## Breaking Changes

- None.

## Compatibility

- Node.js: `>=22.13`
- Quasar: `^2.21.1`
- Quasar App Vite target: `@quasar/app-vite@3.0.0`
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

https://github.com/quasarframework/quasar-ui-qmarkdown/compare/PREVIOUS_TAG...CURRENT_TAG

## Donations

If QMarkdown is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

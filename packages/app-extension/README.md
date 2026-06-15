# Quasar App Extension QMarkdown

The **QMarkdown App Extension** adds the [QMarkdown](../ui) component to a Quasar CLI Vite application. It registers the boot file, adds the QMarkdown stylesheet, configures Vue template handling for markdown content, and can optionally allow importing raw markdown (`*.md`) files.

[![npm](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qmarkdown?label=@quasar/quasar-app-extension-qmarkdown)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qmarkdown.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown)

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![X](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=x&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

## QMarkdown v3.0.0 RC

QMarkdown v3 prepares the app extension for Quasar CLI Vite 3. The app extension requires `@quasar/app-vite` >=3.0.0-rc.3 and no longer supports webpack-based Quasar apps. If your application is still using `@quasar/app-webpack`, migrate the application to Quasar CLI Vite before installing QMarkdown v3.

## Install

```bash
quasar ext add @quasar/qmarkdown
```

## Requirements

- Quasar v2.
- `@quasar/app-vite` >=3.0.0-rc.3.

Quasar CLI will retrieve it from npm and install the extension.

## Prompt

During install, QMarkdown asks one setup question:

```text
Do you want to be able to import markdown (*.md) files?
```

The default answer is `true`. When enabled, QMarkdown adds a Vite raw importer so your Quasar app can import markdown files as strings:

```js
import markdown from "../examples/myMarkdownFile.md";
```

You can then pass that string to the QMarkdown component.

## Uninstall

```bash
quasar ext remove @quasar/qmarkdown
```

## Describe

When installed as an App Extension, you can use:

```bash
quasar describe QMarkdown
```

## Documentation

Docs, demos, and examples are hosted at https://qmarkdown.netlify.app/.

## Source

The project source is available at https://github.com/quasarframework/quasar-ui-qmarkdown.

## Support

If QMarkdown is useful in your workflow and you want to support ongoing maintenance:

- GitHub Sponsors: https://github.com/sponsors/hawkeye64
- PayPal: https://paypal.me/hawkeye64

## License

MIT (c) Jeff Galbraith <jeff@quasar.dev>

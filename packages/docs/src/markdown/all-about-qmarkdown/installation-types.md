---
title: Installation Types
desc: How to install QMarkdown
keys: All about QMarkdown
related:
  - /all-about-qmarkdown/what-is-qmarkdown
  - /other/contributing/bugs-and-feature-requests
  - /other/contributing/sponsor
---

QMarkdown can be installed as a Quasar App Extension, as a Vue plugin, as a direct component import, or through the UMD bundle.

For Quasar CLI projects, the App Extension is the recommended path because it registers the boot file, adds the stylesheet, and configures Vue template handling for markdown content.

## Quasar CLI

### App Extension

To add QMarkdown to your Quasar application, run the following in your Quasar app folder:

```bash
quasar ext add @quasar/qmarkdown
```

While QMarkdown v3 is in beta, install with:

```bash
quasar ext add @quasar/qmarkdown@beta
```

The QMarkdown v3 App Extension targets Quasar CLI Vite 3 and requires `@quasar/app-vite` v3 beta. It does not support webpack-based Quasar applications.

During install, the App Extension asks whether you want to import markdown (`*.md`) files. The default answer is `true`. When enabled, QMarkdown adds a Vite raw importer so this works:

```js
import markdown from "../examples/myMarkdownFile.md";
```

### Uninstall

```bash
quasar ext remove @quasar/qmarkdown
```

### Describe

When installed as an App Extension, you can use:

```bash
quasar describe QMarkdown
```

### Manual Boot File

If you do not install through the App Extension, install the UI package directly:

```bash
pnpm add @quasar/quasar-ui-qmarkdown
# yarn add @quasar/quasar-ui-qmarkdown
# npm install @quasar/quasar-ui-qmarkdown
# bun add @quasar/quasar-ui-qmarkdown
```

Then create and register a boot file:

```js
import { defineBoot } from "#q-app";
import Plugin from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

export default defineBoot(({ app }) => {
  app.use(Plugin);
});
```

QMarkdown relies on Vue preserving the rendered markdown content. If you are not using the App Extension, add the following to `quasar.config.*`:

```js
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

### Manual Source Import

You can import from source when you need to transpile/customize the package in your app:

```js
import { defineBoot } from "#q-app";
import Plugin from "@quasar/quasar-ui-qmarkdown/src/index.js";

export default defineBoot(({ app }) => {
  app.use(Plugin);
});
```

Then add the source stylesheet to `quasar.config.*`:

```js
// Note: using ~ tells Quasar the file resides in node_modules
css: ["app.scss", "~@quasar/quasar-ui-qmarkdown/src/index.scss"],

build: {
  transpile: true,
  transpileDependencies: [/quasar-ui-qmarkdown[\\/]src/],
}
```

## Vue 3 Or Vite

### Vue Plugin

```js
import { createApp } from "vue";
import Plugin from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(Plugin);
app.mount("#app");
```

### Component Import

```html
<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

<script>
  import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";

  export default {
    components: {
      QMarkdown,
    },
  };
</script>
```

## UMD Variant

The UMD bundle exports `window.QMarkdown`.

Add the following tags after the Quasar stylesheet and script tags:

```html
<head>
  <link
    href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown/dist/index.min.css"
    rel="stylesheet"
    type="text/css"
  />
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown/dist/index.umd.min.js"></script>
</body>
```

If you need the RTL variant of the CSS, use this stylesheet instead:

```html
<link
  href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown/dist/index.rtl.min.css"
  rel="stylesheet"
  type="text/css"
/>
```

Your Vue source:

```js
const app = Vue.createApp({
  setup() {
    // ...your setup methods
  },
});

app.component("QMarkdown", QMarkdown.QMarkdown);
app.mount("#app");
```

## Testing On CodePen

[QMarkdown UMD Example on CodePen](https://codepen.io/Hawkeye64/pen/PojXVmV)

## Project Source

Can be found [here](https://github.com/quasarframework/quasar-ui-qmarkdown/tree/dev).

# QMarkdown

Display inline markdown in your Quasar App

[![npm](https://img.shields.io/npm/v/@quasar/quasar-ui-qmarkdown/beta?label=@quasar/quasar-ui-qmarkdown)](https://www.npmjs.com/package/@quasar/quasar-ui-qmarkdown)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-ui-qmarkdown)](https://www.npmjs.com/package/@quasar/quasar-ui-qmarkdown)

[![Discord](https://img.shields.io/badge/discord-join%20server-738ADB?style=for-the-badge&logo=discord&logoColor=738ADB)](https://chat.quasar.dev)
[![Discord](https://img.shields.io/badge/follow-@jgalbraith64-1DA1F2?style=for-the-badge&logo=twitter&logoColor=1DA1F2)](https://twitter.com/jgalbraith64)

# Notes

It is important to note that you cannot use header or hash links or a TOC with the vue-router mode of `hash`. It must be set to `history` in your `quasar.config.(*js|ts)`.

# Usage

## Quasar CLI project

Install the [App Extension](../app-extension).

**OR**:

Install

```bash
pnpm add @quasar/quasar-ui-qmarkdown
# yarn add @quasar/quasar-ui-qmarkdown
# npm install @quasar/quasar-ui-qmarkdown
# bun add @quasar/quasar-ui-qmarkdown
```

and create and register a boot file:

```js
import { defineBoot } from '#q-app'
import VuePlugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})
```

**OR**:

```html
<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

<script>
  import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';

  export default {
    components: {
      QMarkdown,
    },
  };
</script>
```

## Vue 3 project

```js
import VuePlugin from '@quasar/quasar-ui-qmarkdown';
import '@quasar/quasar-ui-qmarkdown/dist/index.css';
import { createApp } from 'vue';

const app = createApp({
  // root instance definition
});

app.use(VuePlugin);
app.mount('#q-app');
```

**OR**:

```html
<style src="@quasar/quasar-ui-qmarkdown/dist/index.css"></style>

<script>
  import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';

  export default {
    components: {
      QMarkdown,
    },
  };
</script>
```

## UMD variant

Exports `window.QMarkdown`.

Add the following tag(s) after the Quasar ones:

```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown/dist/index.min.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown/dist/index.umd.min.js"></script>
</body>
```

If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):

```html
<link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown/dist/index.rtl.min.css" rel="stylesheet" type="text/css" />
```

The docs examples include CodePen buttons for quick UMD playground testing.

# Setup

This project is a pnpm workspace mono-repo.

```bash
pnpm install
pnpm build:ui
pnpm build:docs
```

# Donate

If you appreciate the work that went into this project, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

# License

MIT (c) Jeff Galbraith <jeff@quasar.dev>

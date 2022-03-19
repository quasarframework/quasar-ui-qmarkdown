---
title: Installation Types
desc: How to install QMarkdown
keys: All about QMarkdown
related:
  - /all-about-qmarkdown/what-is-qmarkdown
  - /contributing/bugs-and-feature-requests
  - /contributing/sponsor
---
Vue 3 introduced some breaking changes for QMarkdown. The way that Vue parses text and components now uses a whitespace handling method called `condensed`. When QMarkdown gets this data from slotted content via Vue all the carriage returns have been stripped away. In Vue 3.1.0, a whitespace handling strategy was introduced. Currently, it is buggy. However, another way was found to force Vue to serve the slotted content directly.

If you installed QMarkdown via the Quasar CLI, then the QMarkdown app-extension will modify the `quasar.conf.js` and you won't need to do anything.

However, if you install in any other way, you need give Vue some directives so the whitespace handling works properly.

According to the Vue docs, you need to pass to the `compilerOptions` object a key of `whitespace` with the value `preserve`.

```js
compilerOptions: {
  whitespace: 'preserve'
}
```

As mentioned, this is buggy at the time of this writing. However, there is another way.

If using Quasar, and you did not install via the QMarkdown app-extension, then you need to modify your quasar.conf.js in the following ways, depending on using webpack (app-webpack) or vite (app-vite):

**app-webpack:**

```js
build: {
  vueLoaderOptions: {
    compilerOptions: {
      isPreTag: (tag) => tag === 'pre ' || tag === 'q-markdown'
    }
  }
}
```

**app-vite:**

```js
build: {
  viteVuePluginOptions: {
    template: {
      compilerOptions: {
        isPreTag: (tag) => tag === 'pre ' || tag === 'q-markdown'
      }
    }
  }
}
```

For the Vue CLI, you will need to extrapolate this to fit your needs.

## Quasar CLI

### App Extension

#### Install

To add as an App Extension to your Quasar application, run the following (in your Quasar app folder):
```
$ quasar ext add @quasar/qmarkdown@next
```

Notice the `@next` for Quasar v2 supported version.

#### Uninstall

To remove as an App Extension from your Quasar application, run the following (in your Quasar app folder):
```
$ quasar ext remove @quasar/qmarkdown
```

#### Describe
When installed as an App Extension, you can use `quasar describe QMarkdown`.


### Or Create and register a boot file

```
$ yarn add @quasar/quasar-ui-qmarkdown@next
# or
$ npm install @quasar/quasar-ui-qmarkdown@next
```

Then

```js
import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

export default boot(({ app }) => {
  app.use(Plugin)
})
```

or from sources

```js
import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default boot(({ app }) => {
  app.use(Plugin)
})
```

Additionally, because you are accessing the sources this way, you will need to make sure your project will transpile the code.

In `quasar.conf.js` update the following:
```js
// Note: using ~ tells Quasar the file resides in node_modules
css: [
  'app.sass',
  '~quasar-ui-qmarkdown/src/QMarkdown.sass'
],

build: {
  transpile = true,
  transpileDependencies: [
    /quasar-ui-qmarkdown[\\/]src/
  ]
}
```

### Or target as a component import

```html
<style src="@quasar/quasar-ui-qmarkdown/dist/QMarkdown.min.css"></style>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/dist/QMarkdown.esm.js'

export default {
  components: {
    QMarkdown
  }
}
</script>
```

## Vue CLI or Vite
### Vue project from src

```js
import Plugin from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import App from './App.vue'

const app = createApp(App)
  .use(Plugin)
```

### Vue project from dist

```js
import Plugin from '@quasar/quasar-ui-qmarkdown/dist/QMarkdown.esm.js'
import '@quasar/quasar-ui-qmarkdown/dist/QMarkdown.min.css'
import App from './App.vue'

const app = createApp(App)
  .use(Plugin)
```

### Or component import

```html
<style src="@quasar/quasar-ui-qmarkdown/dist/QMarkdown.min.css"></style>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/dist/QMarkdown.esm.js'

export default {
  components: {
    QMarkdown
  }
}
</script>
```

## UMD variant

Exports `window.QMarkdown`.

### Quasar install

Add the following tag(s) after the Quasar ones:

```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@next/dist/QMarkdown.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@next/dist/QMarkdown.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@next/dist/QMarkdown.rtl.min.css" rel="stylesheet" type="text/css">
```

### Vue install

```html
<head>
  <link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@next/dist/QMarkdown.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body: -->
  <script src="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@next/dist/QMarkdown.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@next/dist/QMarkdown.rtl.min.css" rel="stylesheet" type="text/css">
```

Your Vue source:
```js
const app = Vue.createApp({
  setup() {
    // ...your set up methods
  }
});

app.component("QMarkdown", QMarkdown.QMarkdown);
app.mount("#app");
```


## Testing on Codepen
[QMarkdown UMD Example on Codepen](https://codepen.io/Hawkeye64/pen/PojXVmV)

# Project source
Can be found [here](https://github.com/quasarframework/quasar-ui-qmarkdown/tree/next).

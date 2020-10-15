# Quasar App Extension QMarkdown

[![npm](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qmarkdown.svg?label=quasar-app-extension-qmarkdown)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qmarkdown.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown)


The QMarkdown app extension can do the following:
1. Automatically inject the `@quasar/quasar-ui-qmarkdown` component using the Quasar CLI.
2. Modify webpack to allow importing of markdown (\*.md) files.
3. Modify webpack to allow importing of vue+markdown (\*.vmd) files.

Remember, app extensions can _only_ be used with the Quasar CLI.

[![npm](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qmarkdown.svg?label=@quasar/quasar-app-extension-qmarkdown)](https://www.npmjs.com/package/quasar-app-extension-qmarkdown)
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qmarkdown.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown)

# Updating
If you already have the app extension installed, you can use the Quasar CLI to automatically update it via:
```bash
quasar upgrade -i
```
If you are updating from a beta version, to v1.0.0, you will also need to do the following:
```bash
quasar ext invoke @quasar/qmarkdown
```
At which point you will be asked two questions about importing markdown (\*.md) and vue+markdown (\*.vmd) files.

# New Install
```bash
quasar ext add @quasar/qmarkdown
```
Quasar CLI will retrieve it from NPM and install the extension.

## Prompts

When installing the QMarkdown app extension, you will be prompted with two questions:

1) "Do you want to be able to import markdown (*.md) files?"

The default is `true` for the above question. It allows you to do this in your Quasar apps:

```js
import markdown from '../examples/myMarkdownFile.md'
```

You can now use the QMarkdown component to process the markdown file to be displayed on your page.

2) "Do you want to be able to import vue+markdown (*.vmd) files?"

The default is `true` for the above question. It allows you to do this in your Quasar apps:

```js
import vmd from '../examples/myVuePlusMarkdownFile.vmd'

components: {
  myComponent: vmd
}
```

**vmd** files also allow you to provide front-matter as part of the processing. Be sure to read the documentation to understand how this works.

# Uninstall
```bash
quasar ext remove @quasar/qmarkdown
```

# Describe
You can use `quasar describe QMarkdown` for the QMarkdown component

# Demo Project (source)
Can be found [here](https://github.com/quasarframework/quasar-ui-qmarkdown/tree/master/demo).


# Documentation
Can be found [here](https://quasarframework.github.io/quasar-ui-qmarkdown/).

# Live Demo
Can be found [here](https://quasarframework.github.io/quasar-ui-qmarkdown/demo).

# Donate
If you appreciate the work that went into this project, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

# License
MIT (c) Jeff Galbraith <jeff@quasar.dev>

---
title: Using QMarkdown
desc: How to use QMarkdown
keys: developing
components:
  - apis/QMarkdownJsonApi
---
## API
<q-markdown-json-api />

## Markdown

### Extending Prism

The `prismjs` package is used for language highlighting. When Prism is installed by QMarkdown, it loads itself globally. You can acces it via `window.Prism`. Visit their [documentation](https://prismjs.com/) on modifying the run-time, like adding additional language support.

### Global Properties

QMarkdown has the ability to set some global properties via the `useQMarkdownGlobalProps` function.

To set it up site wide, put it into a boot file. The function takes an object containing the **camelCase** naming of the props for QMarkdown.

::: tip
Any property for QMarkdown can be passed, but must be **camelCased**. Any global properties will overwrite local properties you set on an instance.
:::

```js
import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown'

// defaults for QMarkdown
useQMarkdownGlobalProps({
  noAbbreviation: true,
  noBlockquote: true
})
```

Essentially, the above code makes it so that QMarkdown will no longer render `abbreviations` or `block quotes`.

::: warning
The keys are not validated in any way, so make sure to adhere to the proper type, for that property, to avoid issues.
:::

### Global Plugins

As well, a new property, `plugins`, has been added to replace the `extend` property. In the case of using it in the globalproperties, you can do something like this in a boot file:

```js
import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

// defaults for QMarkdown
useQMarkdownGlobalProps({
  plugins: [markdownItMermaid]
})
```

In this case, the `markdown-it-mermaid` will be made available to all QMarkdown instances.

### Abbreviations
<example-viewer
  title=""
  file="Abbreviations"
  codepen-title="QMarkdown"
/>

### Blockquotes
<example-viewer
  title=""
  file="Blockquotes"
  codepen-title="QMarkdown"
/>

### Code
<example-viewer
  title=""
  file="Code"
  codepen-title="QMarkdown"
/>

### Copy to clipboard
<example-viewer
  title=""
  file="CopyToClipboard"
  codepen-title="QMarkdown"
/>

### Containers
<example-viewer
  title=""
  file="Containers"
  codepen-title="QMarkdown"
/>

### Definition lists
<example-viewer
  title=""
  file="DefinitionLists"
  codepen-title="QMarkdown"
/>

### Emojies
<example-viewer
  title=""
  file="Emojies"
  codepen-title="QMarkdown"
/>

### Emphasis
<example-viewer
  title=""
  file="Emphasis"
  codepen-title="QMarkdown"
/>

### Footnotes
<example-viewer
  title=""
  file="Footnotes"
  codepen-title="QMarkdown"
/>

### Heading
<example-viewer
  title=""
  file="Heading"
  codepen-title="QMarkdown"
/>

### Horizontal rules
<example-viewer
  title=""
  file="HorizontalRules"
  codepen-title="QMarkdown"
/>

### Images
<example-viewer
  title=""
  file="Images"
  codepen-title="QMarkdown"
/>

### Insert
<example-viewer
  title=""
  file="Insert"
  codepen-title="QMarkdown"
/>

### Links
<example-viewer
  title=""
  file="Links"
  codepen-title="QMarkdown"
/>

### Lists
<example-viewer
  title=""
  file="Lists"
  codepen-title="QMarkdown"
/>

### Mark
<example-viewer
  title=""
  file="Mark"
  codepen-title="QMarkdown"
/>

### Subscript/superscript
<example-viewer
  title=""
  file="SubscriptSuperscript"
  codepen-title="QMarkdown"
/>

### Tables
<example-viewer
  title=""
  file="Tables"
  codepen-title="QMarkdown"
/>

### Task lists
<example-viewer
  title=""
  file="TaskLists"
  codepen-title="QMarkdown"
/>

### Titles
<example-viewer
  title=""
  file="Titles"
  codepen-title="QMarkdown"
/>

### Typography
<example-viewer
  title=""
  file="Typography"
  codepen-title="QMarkdown"
/>

## Advanced

### Plugins
<example-viewer
  title=""
  file="Plugins"
  codepen-title="QMarkdown"
/>

### Editor
<example-viewer
  title=""
  file="Editor"
  codepen-title="QMarkdown"
/>

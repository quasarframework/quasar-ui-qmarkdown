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

## Extending Prism

The `prismjs` package is used for language highlighting. When Prism is installed by QMarkdown, it loads itself globally. You can acces it via `window.Prism`. Visit their [documentation](https://prismjs.com/) on modifying the run-time, like adding additional language support.

## Global Properties

QMarkdown has the ability to set global properties via the `useQMarkdownGlobalProps` function.

To set it up site wide, put it into a boot file. The function takes an object containing the **camelCase** naming of the props for QMarkdown.

::: tip
Any property for QMarkdown can be passed, but must be **camelCased**. Any global properties will overwrite local properties you set on an instance.
:::

```js
import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown'

// defaults for QMarkdown
useQMarkdownGlobalProps({
  noLineNumbers: true,
  lineNumberAlt: '$'
})
```

::: warning
The keys are not validated in any way, so make sure to adhere to the proper type, for that property, to avoid issues.
:::

## Global Plugins

As well, the property, `plugins`, has been added to enhance QMarkdown with `markdown-it` plugins. You can do something like this in a boot file:

```js
import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

// defaults for QMarkdown
useQMarkdownGlobalProps({
  plugins: [markdownItMermaid]
})
```

In this case, the `markdown-it-mermaid` will be made available to all QMarkdown instances.

## QMarkdown Native Handling

QMarkdown has a number of built-in processors to handle inline markdown. These are listed below:

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

### Emphasis
<example-viewer
  title=""
  file="Emphasis"
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

### Tables
<example-viewer
  title=""
  file="Tables"
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

## Extending with Plugins

In order to reduce the payload size of QMarkdown and to increase performance, a lot of the "default" markdown-it plugins have been removed. If you have the need, you can add them back either via the `plugins` property or the global props, as descibed above.

Here is a list of plugins that used to be in QMarkdown:

```
import abbreviation from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskLists from 'markdown-it-task-lists'
```

The rest of the plugins are custom with QMarkdown or deemed necessary (like the one to handle images).

### Abbreviations
<example-viewer
  title=""
  file="Abbreviations"
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

### Footnotes
<example-viewer
  title=""
  file="Footnotes"
  codepen-title="QMarkdown"
/>

### Insert
<example-viewer
  title=""
  file="Insert"
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

### Task lists
<example-viewer
  title=""
  file="TaskLists"
  codepen-title="QMarkdown"
/>

### Mermaid
<example-viewer
  title=""
  file="Mermaid"
  codepen-title="QMarkdown"
/>

### Editor
<example-viewer
  title=""
  file="Editor"
  codepen-title="QMarkdown"
/>

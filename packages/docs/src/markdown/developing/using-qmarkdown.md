---
title: Using QMarkdown
desc: How to use QMarkdown
keys: developing
examples: QMarkdown
---
## API

<script import>
import QMarkdownApi from '@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json'
</script>

<MarkdownApi :api="QMarkdownApi" name="QMarkdown"/>

## Markdown

## Importing Markdown

The app extension needs to be installed in order to import markdown (`*.md`) files. In QMarkdown v3, this is supported through Quasar CLI Vite. To import markdown files, **DO NOT** place them into your `public` folder. Put them into your `assets` folder.

```js
<template>
  <q-markdown :src="ContactUs" show-copy />
</template>

<script>
import { defineComponent } from 'vue'
import ContactUs from '@/assets/contact-us.md'

export default defineComponent({
  setup () {
    return {
      ContactUs
    }
  }
})
</script>

```

## Extending Prism

The `prismjs` package is used for language highlighting. When Prism is installed by QMarkdown, it loads itself globally. You can access it via `window.Prism`. Visit their [documentation](https://prismjs.com/) on modifying the run-time, like adding additional language support.

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
<MarkdownExample title="Blockquotes" file="Blockquotes"/>

### Code
<MarkdownExample title="Code" file="Code"/>

### Copy to clipboard
<MarkdownExample title="CopyToClipboard" file="CopyToClipboard"/>

### Containers
<MarkdownExample title="Containers" file="Containers"/>

### Emphasis
<MarkdownExample title="Emphasis" file="Emphasis"/>

### Heading
<MarkdownExample title="Heading" file="Heading"/>

### Horizontal rules
<MarkdownExample title="HorizontalRules" file="HorizontalRules"/>

### Images
<MarkdownExample title="Images" file="Images"/>

### Inline rendering
Use the `inline` prop when markdown needs to live inside existing paragraph or text structure. Inline mode uses `markdown-it.renderInline()` and a `span` root, so emphasis, links, and tokens render without generated paragraph wrappers.

<MarkdownExample title="Inline" file="Inline"/>

### Links
<MarkdownExample title="Links" file="Links"/>

### Lists
<MarkdownExample title="Lists" file="Lists"/>

### Tables
<MarkdownExample title="Tables" file="Tables"/>

### Titles
<MarkdownExample title="Titles" file="Titles"/>

### Typography
<MarkdownExample title="Typography" file="Typography"/>

## Extending with Plugins

In order to reduce the payload size of QMarkdown and to increase performance, a lot of the "default" markdown-it plugins have been removed for v2.0.0+. If you have the need, you can add them back either via the `plugins` property or the global props, as described above.

Here is a list of plugins that used to be in QMarkdown v1.x:

```
import abbreviation from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import { full as emoji } from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskLists from 'markdown-it-task-lists'
```

The rest of the plugins are custom with QMarkdown or deemed necessary (like the one to handle images).

### Abbreviations
<MarkdownExample title="Abbreviations" file="Abbreviations" no-edit/>

### Definition lists
<MarkdownExample title="DefinitionLists" file="DefinitionLists" no-edit/>

### Emojies
<MarkdownExample title="Emojies" file="Emojies" no-edit/>

### Footnotes
<MarkdownExample title="Footnotes" file="Footnotes" no-edit/>

### Insert
<MarkdownExample title="Insert" file="Insert" no-edit/>

### Mark
<MarkdownExample title="Mark" file="Mark" no-edit/>

### Subscript/superscript
<MarkdownExample title="SubscriptSuperscript" file="SubscriptSuperscript" no-edit/>

### Task lists
<MarkdownExample title="TaskLists" file="TaskLists" no-edit/>

### Mermaid
<MarkdownExample title="Mermaid" file="Mermaid" no-edit/>

## Advanced

### Editor
<MarkdownExample title="Editor" file="Editor" no-edit/>

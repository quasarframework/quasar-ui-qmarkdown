---
title: Using QMarkdown
desc: How to use QMarkdown
keys: developing
examples: QMarkdown
related:
  - /developing/advanced
  - /developing/faq
---
## API

<script import>
import QMarkdownApi from '@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json'
</script>

<MarkdownApi :api="QMarkdownApi" name="QMarkdown"/>

## Markdown

This page covers everyday rendering and built-in QMarkdown handling. For Prism customization, global defaults, markdown-it plugin setup, CSS variables, and theme-aware styling, see [Advanced](/developing/advanced).

## Importing Markdown

The app extension needs to be installed in order to import markdown (`*.md`) files. In QMarkdown v4, this is supported through Quasar CLI Vite. To import markdown files, **DO NOT** place them into your `public` folder. Put them into your `assets` folder.

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

For Prism customization, site-wide defaults, and global markdown-it plugins, see [Advanced](/developing/advanced).

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

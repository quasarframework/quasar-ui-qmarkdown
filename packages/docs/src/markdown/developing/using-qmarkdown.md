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

## Source and rendering

These properties control how QMarkdown handles its source before and during rendering.

| Property | Description |
| --- | --- |
| `src` | Supplies the Markdown source when content is not provided through the default slot. |
| `fix-cr` | Replaces escaped `\n` sequences in `src` with newline characters before rendering. |
| `no-html` | Prevents HTML tags in the Markdown source from being rendered as HTML. |
| `no-breaks` | Prevents newline characters from being converted to `<br>` elements. |

## QMarkdown Native Handling

QMarkdown has a number of built-in processors to handle inline markdown. These are listed below:

### Blockquotes
<MarkdownExample title="Blockquotes" file="Blockquotes"/>

### Code

| Property | Description |
| --- | --- |
| `no-highlight` | Disables syntax highlighting in code blocks. |
| `no-line-numbers` | Hides line numbers in code blocks. |
| `line-number-alt` | Replaces generated line numbers with a single alternative character. |

<MarkdownExample title="Code" file="Code"/>

### Copy to clipboard
When copying succeeds, the copy button temporarily changes to the configured `done-icon`. By default, QMarkdown also shows a notification; use `no-notification` when the icon is sufficient feedback.

| Property | Description |
| --- | --- |
| `show-copy` | Shows the copy-to-clipboard button. |
| `copy-icon` | Sets the icon displayed before the content is copied. |
| `done-icon` | Sets the icon temporarily displayed after the content is copied successfully. |
| `no-copy-tooltip` | Hides the copy button tooltip. |
| `copy-tooltip-text` | Sets the text displayed in the copy button tooltip. |
| `no-notification` | Prevents the notification from being shown after the content is copied. |
| `copy-response-text` | Sets the text displayed in the notification after the content is copied. |

<MarkdownExample title="CopyToClipboard" file="CopyToClipboard"/>

### Containers
<MarkdownExample title="Containers" file="Containers"/>

### Emphasis
<MarkdownExample title="Emphasis" file="Emphasis"/>

### Heading

Use the `data` event to receive the generated table-of-contents entries when `toc` is enabled.

| Property | Description |
| --- | --- |
| `toc` | Enables table-of-contents generation and the `data` event. |
| `toc-start` | Sets the first heading level included in the table of contents and generated heading anchor links. |
| `toc-end` | Sets the last heading level included in the table of contents and generated heading anchor links. |
| `no-heading-anchor-links` | Prevents automatic anchor links from being added to headings. |

<MarkdownExample title="Heading" file="Heading"/>

### Horizontal rules
<MarkdownExample title="HorizontalRules" file="HorizontalRules"/>

### Images
<MarkdownExample title="Images" file="Images"/>

### Inline rendering
Use the `inline` prop when markdown needs to live inside existing paragraph or text structure. Inline mode uses `markdown-it.renderInline()` and a `span` root, so emphasis, links, and tokens render without generated paragraph wrappers.

<MarkdownExample title="Inline" file="Inline"/>

### Links

| Property | Description |
| --- | --- |
| `no-link` | Prevents Markdown links from being converted to anchor elements. |
| `no-linkify` | Prevents URL-like text from being converted automatically to links. |
| `linkify-options` | Configures markdown-it's automatic link detection. |
| `no-noopener` | Prevents QMarkdown from adding `rel="noopener"` to external links. |
| `no-noreferrer` | Prevents QMarkdown from adding `rel="noreferrer"` to external links. |

External-link icons are styled with CSS variables. Set `--q-markdown-link-external-icon` to a CSS image, such as an SVG URL, on the QMarkdown content container:

```scss
.custom-markdown-links {
  --q-markdown-link-external-icon: url('/icons/open-in-new.svg');
}
```

Apply the class with `content-class="custom-markdown-links"`. The icon can also be hidden, resized, or repositioned with the related variables documented under [CSS Variables](/developing/advanced#css-variables).

<MarkdownExample title="Links" file="Links"/>

### Lists
<MarkdownExample title="Lists" file="Lists"/>

### Tables
<MarkdownExample title="Tables" file="Tables"/>

### Titles
<MarkdownExample title="Titles" file="Titles"/>

### Typography
<MarkdownExample title="Typography" file="Typography"/>

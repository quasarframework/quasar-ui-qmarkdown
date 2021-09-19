---
title: What is QMarkdown
desc: Inline markdown on the go!
keys: All about QMarkdown
related:
  - /contributing/bugs-and-feature-requests
  - /contributing/components
  - /contributing/documentation
  - /contributing/sponsor
---
::: warning
There are some issues with initial alpha version of QMarkdown. We promise, we will get them resolved as soon as possible. Once this message goes away, feel free to add an issue if you see one that remains.
:::

::: warning
Please note that the codepen links, in the documentation examples, do not work at this time.

And, if you're looking to help out, check out our [Call to action](/contributing/call-to-action) in the **Contributing** section.
:::

## Everything you need for a complete solution

QMarkdown allows you to write markdown via slotted content (or a `src` property). QMarkdown wraps the [markdown-it](https://github.com/markdown-it/markdown-it) package, which for the most part, follows the [commonmark](https://spec.commonmark.org/) specifications. It also has a lot of [plugins](https://www.npmjs.com/search?q=keywords%3Amarkdown-it%20plugin), or you can write your own, for extending QMarkdown.

## Features

1. Blockquotes
2. Code blocks (with copy to clipboard and line numbers support)
3. Containers
4. Emphasis
5. Headings
6. Horizontal rules
7. Links (specific and magic links)
8. Lists
9. Tables
10. Titles
11. Typography

QMarkdown is also extensible via the `plugins` property.

Try out these fine plugins for additional functionality:

1. [Abbreviations](https://www.npmjs.com/package/markdown-it-abbr)
2. [Definition lists](https://www.npmjs.com/package/markdown-it-deflist)
3. [Emojies](https://www.npmjs.com/package/markdown-it-emoji)
4. [Footnotes](https://www.npmjs.com/package/markdown-it-footnote)
5. [Insert](https://www.npmjs.com/package/markdown-it-ins)
6. [Mark](https://www.npmjs.com/package/markdown-it-mark)
7. [Subscript](https://www.npmjs.com/package/markdown-it-sub)/[Superscript](https://www.npmjs.com/package/markdown-it-sup)
8. [Task lists](https://www.npmjs.com/package/markdown-it-task-lists)
9. [Mermaid](https://www.npmjs.com/package/@datatraccorporation/markdown-it-mermaid)


## Global Properties

For all properties that can be used with QMarkdown, you can set the global properties via the `useQMarkdownGlobalProps` function.

Here is an example using the `markdown-it-mermaid` plugin from a boot file:

```js
import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown'
import mermaid from '@datatraccorporation/markdown-it-mermaid'

// defaults for QMarkdown
useQMarkdownGlobalProps({
  plugins: [mermaid]
})
```

The `markdown-it-mermaid` plugin is now globally available wherever you use QMarkdown.

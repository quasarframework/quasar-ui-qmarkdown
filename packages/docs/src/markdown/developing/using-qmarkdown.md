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

For Quasar apps, place Prism setup in a boot file so the extra languages are registered before QMarkdown renders your markdown. If your app uses SSR, make the boot file client-only.

```ts
// src/boot/prism.client.ts
import { defineBoot } from '#q-app'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-json'

type PrismRuntime = typeof import('prismjs')

export default defineBoot(() => {
  const Prism = window.Prism as PrismRuntime | undefined

  if (Prism === void 0) return

  Prism.languages.todo = {
    done: /^\s*\[x\].*$/im,
    pending: /^\s*\[ \].*$/im,
    punctuation: /\[[ x]\]/i,
  }
})
```

Register the boot file in `quasar.config.ts`:

```ts
import { defineConfig } from '#q-app'

export default defineConfig(() => ({
  boot: ['prism'],
}))
```

Now QMarkdown can highlight fences that use the loaded Prism languages or your custom run-time grammar:

````md
```diff
+ QMarkdown can now highlight diff fences.
- Missing language support falls back to plain output.
```

```todo
[ ] Add a Prism language
[x] Render it with QMarkdown
```
````

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

Install only the plugins your project actually uses. To run every example in this section, your app needs these runtime packages:

```json
{
  "dependencies": {
    "@datatraccorporation/markdown-it-mermaid": "^0.5.0",
    "katex": "^0.17.0",
    "markdown-it-abbr": "^2.0.0",
    "markdown-it-deflist": "^3.0.1",
    "markdown-it-emoji": "^3.0.0",
    "markdown-it-footnote": "^4.0.0",
    "markdown-it-ins": "^4.0.0",
    "markdown-it-mark": "^4.0.0",
    "markdown-it-sub": "^2.0.0",
    "markdown-it-sup": "^2.0.0",
    "markdown-it-task-lists": "^2.1.1",
    "markdown-it-texmath": "^1.0.0"
  }
}
```

Some markdown-it plugins do not ship TypeScript declarations. If your project reports a missing module type, add an ambient declaration in a local file such as `src/env.d.ts`:

```ts
declare module "@datatraccorporation/markdown-it-mermaid";
declare module "markdown-it-abbr";
declare module "markdown-it-deflist";
declare module "markdown-it-emoji";
declare module "markdown-it-footnote";
declare module "markdown-it-ins";
declare module "markdown-it-mark";
declare module "markdown-it-sub";
declare module "markdown-it-sup";
declare module "markdown-it-task-lists";
declare module "markdown-it-texmath";
```

Style-based plugins may also need CSS imports. For example, the math example imports both `katex/dist/katex.min.css` and `markdown-it-texmath/css/texmath.css`.

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

### Math
QMarkdown does not bundle a math renderer, but math plugins can be wired in through the `plugins` prop. This example uses `markdown-it-texmath` with KaTeX.

<MarkdownExample title="Math" file="Math" no-edit/>

### Subscript/superscript
<MarkdownExample title="SubscriptSuperscript" file="SubscriptSuperscript" no-edit/>

### Task lists
<MarkdownExample title="TaskLists" file="TaskLists" no-edit/>

### Mermaid
<MarkdownExample title="Mermaid" file="Mermaid" no-edit/>

## Advanced

### Editor
<MarkdownExample title="Editor" file="Editor" no-edit/>

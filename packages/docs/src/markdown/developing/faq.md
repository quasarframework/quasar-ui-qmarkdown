---
title: FAQ
desc: Common QMarkdown development questions
keys: developing
related:
  - /developing/using-qmarkdown
  - /developing/advanced
  - /getting-started/installation-types
---

This page collects common QMarkdown development questions. It is intended to grow from real issues, examples, and community questions.

## Installation and setup

:::details Q. Should I install the App Extension or the UI package directly?

For Quasar CLI Vite apps, use the App Extension when possible:

```bash
quasar ext add @quasar/qmarkdown
```

The App Extension registers the boot file, adds the stylesheet, configures Vue template handling for markdown content, and can optionally enable importing raw markdown files.

Install the UI package directly only when you want to register QMarkdown manually or use it outside the App Extension flow.

:::

:::details Q. Does QMarkdown v4 support webpack-based Quasar apps?

No. QMarkdown v4 targets Quasar CLI Vite 3 and requires `@quasar/app-vite` >=3.0.0. If your app still uses `@quasar/app-webpack`, migrate the app to Quasar CLI Vite before installing QMarkdown v4.

:::

:::details Q. Do I need to import QMarkdown CSS myself?

The App Extension adds the stylesheet for you.

If you install the UI package directly, import the stylesheet in your boot file or app entry:

```js
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
```

Quasar CLI projects can also centralize the stylesheet in `quasar.config.ts`:

```js
// Note: using ~ tells Quasar the file resides in node_modules
css: [
  "app.scss",
  "~@quasar/quasar-ui-qmarkdown/dist/index.css",
],
```

:::

:::details Q. How do I type an App Extension-registered QMarkdown template ref?

Keep runtime component registration in the App Extension and import only the component instance type in `<script setup>`:

```ts
import { useTemplateRef } from "vue";
import type { QMarkdown } from "@quasar/quasar-ui-qmarkdown";

const markdownRef = useTemplateRef<QMarkdown>("markdown");
```

A normal value import of `QMarkdown` creates a local component binding in `<script setup>` and takes precedence over the globally registered component. Use a normal import only when you intend to use the UI component directly, and follow the manual boot file installation path instead of registering it through both paths.

Because application source imports the type, add the UI package as a direct application dependency:

```bash
pnpm add @quasar/quasar-ui-qmarkdown
```

Applications that only use the globally registered component in templates do not need this extra direct dependency.

:::

## Markdown content

:::details Q. Should I use `src` or slotted content?

Use `src` when the markdown is already available as a string, such as markdown imported from a file or fetched from an API.

Use the default slot when the markdown lives inline in the Vue template:

```html
<q-markdown>
  ## Hello QMarkdown

  This content is rendered from the default slot.
</q-markdown>
```

If both are supplied, the slot content takes precedence.

:::

:::details Q. Why does my slotted markdown render incorrectly?

Markdown is whitespace-sensitive. The App Extension configures Vue template handling so `q-markdown` content is preserved correctly.

If you are registering QMarkdown manually, make sure your `quasar.config.*` preserves whitespace for QMarkdown:

```js
build: {
  viteVuePluginOptions: {
    template: {
      compilerOptions: {
        whitespace: "preserve",
        isPreTag: (tag) => tag === "pre" || tag === "q-markdown" || tag === "QMarkdown",
      },
    },
  },
}
```

QMarkdown also removes common template indentation from slotted markdown so the content can be formatted naturally inside Vue files.

:::

:::details Q. How do I render markdown inside an existing paragraph?

Use the `inline` prop when the markdown should participate in existing text flow:

```html
<p>
  <q-markdown inline src="Render **inline markdown** without paragraph wrappers." />
</p>
```

Inline mode uses `markdown-it.renderInline()` and a `span` root, so it avoids generated block-level paragraph wrappers. Keep normal block mode for headings, lists, tables, blockquotes, and full markdown documents.

:::

:::details Q. How do I import markdown files?

Install the App Extension and answer `true` when prompted to enable importing markdown files.

Then keep markdown files in your source tree, such as `src/assets`, not in `public`:

```js
import content from "@/assets/my-page.md";
```

```html
<q-markdown :src="content" />
```

The App Extension adds a Vite raw importer for `*.md` files when that prompt is enabled.

:::

## Markdown features

:::details Q. How do I automatically link bare domains such as example.com?

Markdown-it 15 does not linkify domains without a protocol by default. Enable `fuzzyLink` through QMarkdown's `linkify-options` prop:

```html
<q-markdown :linkify-options="{ fuzzyLink: true }" :src="markdown" />
```

Use `useQMarkdownGlobalProps({ linkifyOptions: { fuzzyLink: true } })` when every QMarkdown instance should use this behavior.

:::

:::details Q. How do I add markdown-it plugins?

Pass plugins directly to a QMarkdown instance or register them globally with `useQMarkdownGlobalProps`.

```js
import { useQMarkdownGlobalProps } from "@quasar/quasar-ui-qmarkdown";
import { full as emoji } from "markdown-it-emoji";

useQMarkdownGlobalProps({
  plugins: [emoji],
});
```

Global props belong in a boot file when you want every QMarkdown instance to share the same defaults.

:::

:::details Q. Why are some markdown-it plugins not enabled by default?

QMarkdown v2+ removed several optional markdown-it plugins from the default runtime to reduce payload size and improve performance.

If you need features such as abbreviations, definition lists, emoji, footnotes, insert, mark, subscript, superscript, or task lists, install and register the matching markdown-it plugin.

:::

:::details Q. How do I customize syntax highlighting?

QMarkdown uses Prism for language highlighting. When Prism is available, you can access it through `window.Prism` and load additional Prism languages or plugins as needed.

For examples, see [Using QMarkdown](/developing/using-qmarkdown).

:::

:::details Q. Can I inspect the component API from the Quasar CLI?

Yes. After the App Extension is installed, run:

```bash
quasar describe QMarkdown
```

The same generated API is shown on the [Using QMarkdown](/developing/using-qmarkdown) page.

:::

## Troubleshooting

:::details Q. Where should I report bugs or ask questions?

Use [GitHub Issues](https://github.com/quasarframework/quasar-ui-qmarkdown/issues) for bugs and feature requests. Use [GitHub Discussions](https://github.com/quasarframework/quasar-ui-qmarkdown/discussions) for broader questions, RFCs, or implementation discussion.
:::

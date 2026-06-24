---
title: Advanced
desc: Advanced QMarkdown customization patterns
keys: developing
examples: QMarkdown
related:
  - /developing/using-qmarkdown
  - /developing/faq
  - /getting-started/installation-types
---

QMarkdown renders markdown into normal HTML and decorates the parts it owns with `q-markdown` classes. Most projects should start with the component props, then use CSS variables and scoped wrapper classes for visual customization.

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

The `plugins` property can be registered globally when every QMarkdown instance should use the same markdown-it extensions. Put the defaults in a boot file:

```js
import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

// defaults for QMarkdown
useQMarkdownGlobalProps({
  plugins: [markdownItMermaid]
})
```

In this case, the `markdown-it-mermaid` plugin will be made available to all QMarkdown instances.

## Extending with Plugins

In order to reduce the payload size of QMarkdown and to increase performance, a lot of the "default" markdown-it plugins have been removed for v2.0.0+. If you have the need, add them back with the `plugins` property or register them globally from a boot file.

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

The rest of the plugins are custom with QMarkdown or deemed necessary, like the one to handle images.

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

## Styling Strategy

For one QMarkdown instance, use `content-class` or `content-style`.

```vue
<q-markdown content-class="docs-markdown" :src="markdown" />
```

For site-wide styling, put your overrides in a global stylesheet loaded after QMarkdown's stylesheet.

```scss
.docs-markdown {
  --q-markdown-link-color: var(--q-primary);
}

.body--dark .docs-markdown {
  --q-markdown-link-color: var(--qpress-color-primary, #81d4fa);
}
```

Use `content-style` when a value is specific to a single rendered block.

```vue
<q-markdown
  :content-style="{ '--q-markdown-link-color': 'var(--q-positive)' }"
  :src="markdown"
/>
```

Container blocks are a good place to use `content-class`. QMarkdown renders them with the `.q-markdown--note` class and a variant class such as `.q-markdown--note--tip`, `.q-markdown--note--warning`, or `.q-markdown--note--danger`.

<MarkdownExample title="Container Styling" file="ContainerStyling" no-edit/>

## CSS Variables

QMarkdown exposes these CSS variables for customization:

| Variable | Purpose |
| --- | --- |
| `--q-markdown-link-color` | Color used by markdown links and plugin-generated anchors. |
| `--q-markdown-link-hover-color` | Hover and keyboard-focus color for markdown links and plugin-generated anchors. |

In a Q-Press site, QMarkdown reads `--qpress-color-primary` when it is available. Outside Q-Press, it falls back to Quasar's `--q-primary` and then to the compiled Quasar primary color.

Dark mode can be customized independently:

```scss
.body--dark .docs-markdown {
  --q-markdown-link-color: var(--qpress-color-primary, #81d4fa);
  --q-markdown-link-hover-color: color-mix(
    in srgb,
    var(--q-markdown-link-color) 76%,
    var(--qpress-text-primary, #f5f5f5)
  );
}
```

## Link Overrides

QMarkdown styles two kinds of links:

- Links produced by QMarkdown's built-in link renderer use `.q-markdown--link`.
- Plain anchors emitted by markdown-it plugins, such as footnote references, are styled through `.q-markdown :where(a)`.

If a plugin emits its own custom classes, scope the override to your content class so it does not leak into the rest of the app.

```scss
.docs-markdown .footnotes {
  color: var(--qpress-text-body, currentColor);
}

.docs-markdown .footnote-ref > a,
.docs-markdown .footnote-backref {
  color: var(--q-markdown-link-color);
}
```

## QMarkdown Classes

These classes are stable enough to use for targeted visual overrides:

| Class | Use |
| --- | --- |
| `.q-markdown` | Root rendered markdown container. |
| `.q-markdown--inline` | Root container when the `inline` prop is used. |
| `.q-markdown--link` | Links handled by QMarkdown's built-in link renderer. |
| `.q-markdown--token` | Inline token chips generated by QMarkdown. |
| `.q-markdown--note` | Custom container blocks such as tips, warnings, and notes. |
| `.q-markdown--table` | Tables generated by QMarkdown's table renderer. |
| `.q-markdown__copy` | Copy-to-clipboard button when `show-copy` is enabled. |

Prefer variables for color changes. Use class selectors when you need to adjust spacing, borders, or layout for rendered markdown structures.

## Theme-Aware Components

When a markdown block lives inside a themed surface, let it inherit from the surrounding theme instead of hard-coding colors.

```scss
.help-panel {
  --help-link: var(--q-primary);
  color: var(--q-dark);
  background: white;
}

.body--dark .help-panel {
  --help-link: var(--qpress-color-primary, #81d4fa);
  color: var(--qpress-text-primary, #f5f5f5);
  background: #121212;
}

.help-panel .q-markdown {
  --q-markdown-link-color: var(--help-link);
}
```

## Plugin Markup Styling

Plugins can emit HTML that QMarkdown does not directly control. That is expected. QMarkdown still applies root typography and link variables, but plugin-specific layouts may need their own CSS.

Keep plugin CSS close to the feature:

```scss
.docs-markdown .task-list-item {
  list-style: none;
}

.docs-markdown .task-list-item-checkbox {
  margin-right: 0.5rem;
}
```

Style-based plugins may also ship their own CSS. Import that CSS where the plugin is registered or in your global stylesheet.

## Editor Example

The editor example combines global props, plugins, live preview, and code editing in one component.

<MarkdownExample title="Editor" file="Editor" no-edit/>

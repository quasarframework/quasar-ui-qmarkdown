QMarkdown
===

QMarkdown is a [Quasar App Extension](https://v1.quasar.dev/app-extensions/introduction). It provides the ability for your web app to display markdown.

# Features

## Markdown Constructs

- Abbreviations
- Blockquotes
- Code and Code Highlighting
- Containers
- Definition Lists
- Emojies
- Emphasis
- Footnotes
- Headings
- Images
- Inserts
- Links
- Lists
- Marks
- Rules
- Subscript/Superscript
- Tables
- Tasklists
- Titles
- Typography

## Loaders
- markdown (.md) loader that can load your markdown as text to be processed by QMarkdown
- vue+markdown (.vmd) loader that can process markdown, then hand off to Vue to be processed

## Front-Matter
- The front-matter functonality is only available to vue+markdown (`.vmd`) files.

## Utility Functions
- `getTagParts` that can process a Vue SFC file and return the `template`, `script` and `style` parts

# Install
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add @quasar/qmarkdown
```

# Uninstall
To remove this App Extension from your Quasar application, run the following (in your Quasar app folder):
```
quasar ext remove @quasar/qmarkdown
```

# Describe
You can use `quasar describe QMarkdown`

# Demo Project (source)
Can be found [here](https://github.com/quasarframework/quasar-ui-qmarkdown/tree/master/demo).

# Live Demo
Can be found [here](https://quasarframework.github.io/quasar-ui-qmarkdown/demo).

# Working with markdown
There are two way to pass your markdown content to QMarkdown: Vue slot or property.

QMarkdown also comes with a Webpack loader that allows you to import your markdown directly into your code.

Also, you have the ability to get the TOC (Table of Contents), if one is generated, and display that as well.

## Using a Vue slot
You can simply use a Vue slot to display markdown.

In your HTML:
```html
<q-markdown>
Put your markdown here

Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)
</q-markdown>
```
However, this can be a bit inconvenient because linters, if you are using one, may cause you to get weird errors as a result of unexpected language constructs that it's unfamiliar with.

The recommended way, would be to import the markdown to be used so that it doesn't interfere with your linter.

## Importing Markdown
QMarkdown comes with a Webpack loader for importing markdown files directly into your code.

In your JavaScript:
```js
import markdown from '../markdown/calendar.md'

export default {
  data () {
    return {
      markdown: markdown
    }
  },
...
```

And, in your HTML:
```html
<q-markdown :src="markdown" />
```

# Setting up Table of Contents
You enable a TOC by setting `:toc="true"`. The data in the TOC is based on HTML Headings (H1-H6). You can change the number of headings that you are interested in by using the `toc-start` and `toc-end` properties.

To get the data for the TOC, you must use the `@data` event.

HTML
```html
<q-markdown :src="markdown" toc @data="onToc" />
```

JavaScript:
```js
methods: {
  onToc (toc) {
    this.toc = toc
  }
}
```

The TOC data looks like this:
```
[
  {id: 'h2-Heading', title: 'h2 Heading', level: 2, children: []},
  {id: 'h3-Heading', title: 'h3 Heading', level: 3, children: []}
]
```

If you desire a hierarchical tree of data instead, do the following:

HTML
```html
<q-markdown ref="markdown" :src="markdown" toc @data="onToc" />
```

JavaScript:
```js
methods: {
  onToc (toc) {
    this.toc = this.$refs.markdown.makeTree(toc)
  }
}
```

The TOC data will be transformed to the following:
```
[
  {id: 'h2-Heading', title: 'h2 Heading', level: 2, children: [
    {id: 'h3-Heading', title: 'h3 Heading', level: 3, children: []}
  ]}

]
```

# Importing Vue+Markdown (.vmd)

You are able to mix Vue (SFC: single-file component) and Markdown together. This must be in a file with an extension of `.vmd` (vue+markdown). The markdown can only reside in the `<template>` section of the Vue SFC file. The data you are reading right now, comes from a `.vmd` file.

The minimal viable `.vmd` file must contain a `<template>` section. All other sections are optional.

Example (from the top of this file):

```html
<template>
  <div class="q-pa-md q-gutter-sm q-markdown">

QMarkdown
===

QMarkdown is a [Quasar App Extension](https://v1.quasar.dev/app-extensions/introduction). It provides the ability for your web app to display markdown.

# Features
... // the rest of the markdown
</template>
```

As you may have noticed, your HTML code should add the `q-markdown` class to the wrapper html in order to get all proper syntax highlighting.

Now, as far as getting it to be displayed on your page, do the following in your `<script>` section:

```js
import markdownVue from '../markdown/markdown.vmd'

export default {

  components: {
    markdownVue
  },

```

and in your HTML `<template>` section:

```html
<template>
  <markdown-vue />
</template>
```

## TOC with Vue+Markdown

If you would like to generate a TOC (Table of Contents) derived from the header components (h1, h2, h3, etc), you will need to add some code to your `.vmd` file so it can be accepted. Just add the following to your `data ()` instance in the `.vmd`:

```
  data () {
    return {
      // eslint-disable-next-line
      tocData: []
    }
  },
```

The Vue+Markdown (`.vmd`) loader will replace the `tocData: [ ]` (extra space in square brackets added to avoid this feature in the docs) if found and add the TOC data.

::: warning
Notice the commented line `eslint-disable-next-line`? The data added is not formatted and eslint will complain during compilation time. If you use something other than eslint, you may need to add an appropriate **ignore** statement for your linter.
:::

Finally, if your TOC data is used elsewhere, like the right-drawer in these docs, you need a way of getting it there and if you are using a Vuex store, this is relative easy:

```
  mounted () {
    this.toc = this.tocData
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  }
```

## Vue+Markdown Issues
So far, a couple of issues have been found.
1. When using `-` over multiple rows for an unorder list, the markdown processor sometimes is not putting in the end `</ul>` tag which causes an issue with Vue transpiling. You can make this an ordered list with `1.` notation.
2. When using text interpolation, better known as moustache or handle bars, the Vue Loader sees these in the markdown and tries to do substitution which will cause Vue Loader to complain that the variable does not exist. You can fix this, by taking the text from the interpolation and use the `v-text="my text"` instead (like a `span` tag).

## Vue+Markdown Comments
Vue+Markdown is experimental. There are a few other authors doing it, like **Vue Press** and **Sable**, as well as the **Quasar Documentation**. However, none of them are using a `.vmd` extension. This was used to distinguish vue+markdown from regular markdown. As such, your favorite editor may not have syntax highlighting that works with `.vmd` files. Hopefully, in the future, this will be resolved.

# Front-Matter with Vue+Markdown
Front-Matter is a way of extracting meta data from the beginning of a file and converting it to object format. The format for Front-Matter is in YAML format.

::: tip
All Front-Matter meta data defined in your .vmd file **must** be at the top of the file.
:::

An example of Front-Matter YAML:

```yaml
---
title: QMarkdown Docs
desc: This is the documentation for QMarkdown
---
```

This will be converted to:

```js
{
  title: "QMarkdown Docs",
  desc: "This is the documentation for QMarkdown"
}
```

This is injected into your Vue data by having the following:

```js
  data () {
    return {
      // eslint-disable-next-line
      frontMatter: {}
    }
  },
```

The Vue+Markdown (`.vmd`) loader will replace the `frontMatter: { }` (extra space in parentheis added to avoid this feature in the docs) if found and add the Front-Matter data.

::: warning
Notice the commented line `eslint-disable-next-line`? The data added is not formatted and eslint will complain during compilation time. If you use something other than eslint, you may need to add an appropriate **ignore** statement for your linter.
:::

Finally, you can use the Front-Matter data like this:

```js
  mounted () {
    document.title = this.frontMatter.title
  },
```

# Extracting Vue SFC parts
Additionally, QMarkdown comes with a utility function to extract SFC files into their tag parts (where tag is one of `template`, `script` and `style`). There are two ways you can import the function:

```js
import getTagParts from '@quasar/quasar-ui-qmarkdown/src/lib/getTagParts'
// or
const getTagParts = require('@quasar/quasar-ui-qmarkdown/src/lib/getTagParts').default
```

And then, you can use it like this:

```
  mounted () {
    // eslint-disable-next-line import/no-webpack-loader-syntax
    const results = getTagParts(require('!!raw-loader!../components/Hero.vue').default)

    console.log('template', results.template)
    console.log('script', results.script)
    console.log('css', results.css)
  },
```

This makes use of the `raw-loader` Webpack loader. The exclamations (or bang characters) are needed to tell Webpack to overload the default loader.

::: tip
`raw-loader` is already loaded via QMarkdown and you do not need to install it.
:::

Now, you will have access to the tag parts of the Vue file.

# Extending Markdown-it!
You can use the `extend` property to extend the Markdown-it! markdown processor. The extend function takes a single argument of the md (markdown) instance.

Now, you can extend QMarkdown with either your own code or Markdown-it! [plugins](https://www.npmjs.com/search?q=keywords:markdown-it-plugin). Please read the Markdown-It [documentation](https://github.com/markdown-it/markdown-it#readme) on how to do this.

Syntax:

```html
<q-markdown :extend="extendMarkdown" />
```

```js
methods: {
  // to extend links
  extendMarkdown (md) {
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx]

      const hrefIndex = token.attrIndex('href')
      if (token.attrs[hrefIndex][1][0] === '/') {
        token.attrSet('class', 'q-markdown--link q-markdown--link-local')
      } else {
        token.attrSet('class', 'q-markdown--link q-markdown--link-external')
        token.attrSet('target', '_blank')
      }

      return self.renderToken(tokens, idx, options)
    }
  }
}
```

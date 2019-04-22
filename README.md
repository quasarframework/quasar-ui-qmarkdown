QMarkdown (@quasar/qmarkdown)
===

![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20UI%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-qmarkdown.svg?style=plastic)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-qmarkdown.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-qmarkdown.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-qmarkdown.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown)

QMarkdown is an `UI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `beta` and there are expected changes while things get worked out. Your help with testing is greatly appreciated.

# Info
QMarkdown allows you to have markdown in your web pages. You can either use the standard default slot or use the property `src` to define your markdown.

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

# Test Project
In **demo** folder of **app-extension-qmarkdown**.

# Demo
Can be found [here](https://quasarframework.github.io/app-extension-qmarkdown/demo/dist/spa/#/).

# Example Code
Be sure to check out the Test Project for more examples.
```
<q-markdown>
Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)
</q-markdown>
```

# Imports
QMarkdown now allows you to import markdown files into your Vue files.

```
import markdown from '../markdown/calendar.md'
```

then,

```
  data () {
    return {
      markdown: markdown
    }
  },
```

and finally:

```
<q-markdown :src="markdown" />
```

# QMarkdown Vue Properties
| Vue&nbsp;Property | Type	| Description |
|---|---|---|
| src | String | Pass the markdown as a string instead of a slot |
| no-html | Boolean | Disable HTML tags in source |
| no-link | Boolean | Disable conversion of links |
| no-linkify | Boolean | Disable auto-convert URL-like text to links |
| no-typographer | Boolean | Disable language-neutral replacement + quotes beautification |
| no-breaks | Boolean | Disable conversion of '\\n' into <br> |
| no-highlight | Boolean | Disable code highlighter |
| no-emoji | Boolean | Disable emojie conversion |
| no-subscript | Boolean | Disable subscript conversion |
| no-superscript | Boolean | Disable superscript conversion |
| no-footnote | Boolean | Disable footnote conversion |
| no-deflist | Boolean | Disable definition list conversion |
| no-abbreviation | Boolean | Disable abbreviation conversion |
| no-insert | Boolean | Disable insert conversion |
| no-mark | Boolean | Disable mark conversion |
| no-image | Boolean | Disable image conversion |
| no-tasklist | Boolean | Disable tasklist conversion |
| no-container | Boolean | Disable container conversion |
| toc | Boolean | Generate a TOC; received with `toc` event |
| toc-start | Number | [1-5] The number defines the starting header (ex: 1 == h1, 2 == h2, etc) |
| toc-end | Number | [2-6] The number defines the ending header (ex: 3 == h3, 4 == h4, etc). This number must be greater than the `startingToc` property or it will be ignored |
| task-lists-enable | Boolean | set to true to enable task lists checkboxes (not read-only) |
| task-lists-label | Boolean | to wrap the rendered list items in a <label> element for UX purposes |
| task-lists-enable-after | Boolean | to add the label after the checkbox |
| content-class | [String, Object, Array] | Style definitions to be attributed to the markdown |
| content-style | [String, Object, Array] | Style definitions to be attributed to the markdown |

# QMarkdown Vue Events
| Vue&nbsp;Event | Description |
|---|---|
| data | If the `toc` proerty is set to `true`, this event will occur containing any TOC data, if there is any. This is an array of flat data |

Given markdown that looks like this:
```
## h2 Heading

### h3 Heading
```

The TOC data looks like this:
```
[
  {id: 'h2-Heading', title: 'h2 Heading', level: 2, children: []},
  {id: 'h3-Heading', title: 'h3 Heading', level: 3, children: []}
]
```

# QMarkdown Vue Methods
| Vue&nbsp;Method | Description |
|---|---|
| makeTree | Pass into this function the results from the @data to have the data array transformed into a hieracrhial tree. |

The TOC data will be transformed to the following:
```
[
  {id: 'h2-Heading', title: 'h2 Heading', level: 2, children: [
    {id: 'h3-Heading', title: 'h3 Heading', level: 3, children: []}
  ]}
  
]
```

# QMarkdown Vue Slots
| Vue&nbsp;Slot | Description |
|---|---|
| default | The default slot - this slot overrides anything that may be passed in via the `src` property. |


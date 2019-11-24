import markdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
// import container from 'markdown-it-container'
import taskLists from 'markdown-it-task-lists'
// import imsize from 'markdown-it-imsize'
import imsize from 'markdown-it-imsize/dist/markdown-it-imsize.js'
// import toc from 'markdown-it-toc-and-anchor'

import Prism from 'prismjs'
import prismHighlight from '../util/highlight.js'

import extendBlockQuote from '../util/extendBlockQuote.js'
import extendContainers from '../util/extendContainers.js'
import extendHeading from '../util/extendHeading.js'
import extendImage from '../util/extendImage.js'
import extendLink from '../util/extendLink.js'
import extendTable from '../util/extendTable.js'
import extendToken from '../util/extendToken.js'
import extendFenceLineNumbers from '../util/extendFenceLineNumbers.js'

export default {
  name: 'QMarkdown',

  props: {
    // the markdown source, or use slot - slot overrides this property
    src: {
      type: String,
      default: ''
    },
    // no html entities
    noHtml: Boolean,
    // no links
    noLink: Boolean,
    // no automatic links
    noLinkify: Boolean,
    // no typographer
    noTypographer: Boolean,
    // no breaks
    noBreaks: Boolean,
    // no code highlights
    noHighlight: Boolean,
    // no emojies
    noEmoji: Boolean,
    // no subscript
    noSubscript: Boolean,
    // no superscript
    noSuperscript: Boolean,
    // no footnotes
    noFootnote: Boolean,
    // no Deflists
    noDeflist: Boolean,
    // no abbreviations
    noAbbreviation: Boolean,
    // no inserts
    noInsert: Boolean,
    // no marks
    noMark: Boolean,
    // no images
    noImage: Boolean,
    // no tasklists
    noTasklist: Boolean,
    // no containers
    noContainer: Boolean,
    // no line-numbers
    noLineNumbers: Boolean,
    // alternative character to use instead of line numbers
    lineNumberAlt: {
      type: String,
      validator: v => v.length === 1
    },
    // set to true to enable Table of Contents (sent via emit)
    toc: Boolean,
    tocStart: {
      type: Number,
      default: 1,
      validator: v => v >= 1 && v <= 5
    },
    tocEnd: {
      type: Number,
      default: 3,
      validator: v => v >= 2 && v <= 6
    },
    // set to true to enable task lists checkboxes (not read-only)
    taskListsEnable: Boolean,
    // to wrap the rendered list items in a <label> element for UX purposes
    taskListsLabel: Boolean,
    // to add the label after the checkbox
    taskListsLabelAfter: Boolean,
    // extend markdown-it!
    extend: Function,
    extendPrism: Function,
    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array]
  },

  data () {
    return {
      source: this.src,
      md: void 0,
      rebuild: true
    }
  },

  watch: {
    src (val) {
      // TODO: "= val" instead?
      this.source = this.src
    },
    noHtml () { this.rebuild = true },
    noLink () { this.rebuild = true },
    noLinkify () { this.rebuild = true },
    noTypographer () { this.rebuild = true },
    noBreaks () { this.rebuild = true },
    noHighlight () { this.rebuild = true },
    noEmoji () { this.rebuild = true },
    noSubscript () { this.rebuild = true },
    noSuperscript () { this.rebuild = true },
    noFootnote () { this.rebuild = true },
    noDeflist () { this.rebuild = true },
    noAbbreviation () { this.rebuild = true },
    noInsert () { this.rebuild = true },
    noImage () { this.rebuild = true },
    noTasklist () { this.rebuild = true },
    noContainer () { this.rebuild = true },
    noLineNumbers () { this.rebuild = true },
    lineNumberAlt () { this.rebuild = true },
    toc () { this.rebuild = true },
    tocStart () { this.rebuild = true },
    tocEnd () { this.rebuild = true },
    taskListsEnable () { this.rebuild = true },
    taskListsLabel () { this.rebuild = true },
    taskListsLabelAfter () { this.rebuild = true },
    extend () { this.rebuild = true }
  },

  methods: {
    __isEnabled (val) {
      return val === void 0 || val === false
    },

    __isFunction (f) {
      return f && {}.toString.call(f) === '[object Function]'
    },

    makeTree (list) {
      let tree = []
      let root = null

      const addToTree = (item) => {
        if (item.level === 1) {
          root = item
          tree.push(item)
        } else if (item.level === 2) {
          root.children.push(item)
        } else {
          let parent = root
          for (let k = 0; k < item.level - 2; ++k) {
            parent = parent.children[parent.children.length - 1]
          }
          if (parent) {
            parent.children.push(item)
          }
        }
      }

      for (let i = 0; i < list.length; ++i) {
        addToTree(list[i])
      }

      return tree
    }
  },

  render (h) {
    let tocData = []

    // TODO: is there a better way than recreating everything from scratch?
    // example: cache the result, use watchers to recreate cache
    if (this.md === void 0 || this.rebuild === true) {
      this.rebuild = false

      if (this.__isFunction(this.extendPrism)) {
        this.extendPrism(Prism)
      }

      const highlight = (str, lang) => {
        if (this.__isEnabled(this.noHighlight)) {
          return prismHighlight(Prism, str, lang)
        }
        return ''
      }

      const opts = {
        html: this.__isEnabled(this.noHtml),
        linkify: this.__isEnabled(this.noLinkify),
        typographer: this.__isEnabled(this.noTypographer),
        breaks: this.__isEnabled(this.noBreaks),
        highlight: highlight
      }

      this.md = markdownIt(opts)
      if (this.__isEnabled(this.noSubscript)) {
        this.md.use(subscript)
      }
      if (this.__isEnabled(this.noSuperscript)) {
        this.md.use(superscript)
      }
      if (this.__isEnabled(this.noFootnote)) {
        this.md.use(footnote)
      }
      if (this.__isEnabled(this.noDeflist)) {
        this.md.use(deflist)
      }
      if (this.__isEnabled(this.noAbbreviation)) {
        this.md.use(abbreviation)
      }
      if (this.__isEnabled(this.noInsert)) {
        this.md.use(insert)
      }
      if (this.__isEnabled(this.noMark)) {
        this.md.use(mark)
      }
      if (this.__isEnabled(this.noEmoji)) {
        this.md.use(emoji)
      }
      if (this.__isEnabled(this.noImage)) {
        this.md.use(imsize)
      }
      if (this.__isEnabled(this.noTasklist)) {
        this.md.use(taskLists, { enabled: this.taskListsEnable, label: this.taskListsLabel, labelAfter: this.taskListsLabelAfter })
      }

      extendBlockQuote(this.md)
      extendHeading(this.md, tocData, this.toc, this.tocStart, this.tocEnd)
      extendImage(this.md)
      extendLink(this.md)
      extendTable(this.md)
      extendToken(this.md)
      if (this.__isEnabled(this.noContainer)) {
        extendContainers(this.md)
      }
      if (this.__isEnabled(this.noLineNumbers)) {
        extendFenceLineNumbers(this.md, this.lineNumberAlt)
      }

      let disabled = []
      if (!this.__isEnabled(this.noImage)) {
        disabled.push('image')
      }
      if (!this.__isEnabled(this.noLink)) {
        disabled.push('link')
      }
      if (disabled.length > 0) {
        this.md.disable(disabled)
      }

      if (this.__isFunction(this.extend)) {
        this.extend(this.md)
      }
    }

    // get the markdown - slot overrides 'src'
    let markdown = this.src
    if (this.$slots.default) {
      markdown = this.$slots.default[0].text
    }

    const rendered = this.md.render(markdown)

    if (this.toc && tocData.length > 0) {
      this.$emit('data', tocData)
    }

    return h('div', {
      staticClass: 'q-markdown',
      class: this.contentClass,
      style: this.contentStyle,
      domProps: {
        innerHTML: rendered
      }
    })
  }
}

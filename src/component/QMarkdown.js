import Vue from 'vue'

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
import imsize from 'markdown-it-imsize'
// import toc from 'markdown-it-toc-and-anchor'

import prismHighlight from '../lib/highlight'

import extendBlockQuote from '../lib/extendBlockQuote'
import extendContainers from '../lib/extendContainers'
import extendHeading from '../lib/extendHeading'
import extendImage from '../lib/extendImage'
import extendLink from '../lib/extendLink'
import extendTable from '../lib/extendTable'
import extendToken from '../lib/extendToken'
import extendFenceLineNumbers from '../lib/extendFenceLineNumbers'

export default Vue.extend({
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
    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array]
  },

  data () {
    return {
      source: this.src
    }
  },

  watch: {
    src (val) {
      // TODO: "= val" instead?
      this.source = this.src
    }
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
    const highlight = (str, lang) => {
      if (this.__isEnabled(this.noHighlight)) {
        return prismHighlight(str, lang)
      }
      return ''
    }

    const opts = {
      html: this.__isEnabled(this.noHtml),
      linkify: this.__isEnabled(this.noLinkify),
      typographer: this.__isEnabled(this.noTypographer),
      breaks: this.__isEnabled(this.noBreaks),
      highlight
    }

    // TODO: is there a better way than recreating everything from scratch?
    // example: cache the result, use watchers to recreate cache
    const md = markdownIt(opts)
    if (this.__isEnabled(this.noSubscript)) {
      md.use(subscript)
    }
    if (this.__isEnabled(this.noSuperscript)) {
      md.use(superscript)
    }
    if (this.__isEnabled(this.noFootnote)) {
      md.use(footnote)
    }
    if (this.__isEnabled(this.noDeflist)) {
      md.use(deflist)
    }
    if (this.__isEnabled(this.noAbbreviation)) {
      md.use(abbreviation)
    }
    if (this.__isEnabled(this.noInsert)) {
      md.use(insert)
    }
    if (this.__isEnabled(this.noMark)) {
      md.use(mark)
    }
    if (this.__isEnabled(this.noEmoji)) {
      md.use(emoji)
    }
    if (this.__isEnabled(this.noImage)) {
      md.use(imsize)
    }
    if (this.__isEnabled(this.noTasklist)) {
      md.use(taskLists, { enabled: this.taskListsEnable, label: this.taskListsLabel, labelAfter: this.taskListsLabelAfter })
    }

    let tocData = []
    extendBlockQuote(md)
    extendHeading(md, tocData, this.toc, this.tocStart, this.tocEnd)
    extendImage(md)
    extendLink(md)
    extendTable(md)
    extendToken(md)
    if (this.__isEnabled(this.noContainer)) {
      extendContainers(md)
    }
    if (this.__isEnabled(this.noLineNumbers)) {
      extendFenceLineNumbers(md, this.lineNumberAlt)
    }

    let markdown = this.src
    if (this.$slots.default) {
      markdown = this.$slots.default[0].text
    }

    let disabled = []
    if (!this.__isEnabled(this.noImage)) {
      disabled.push('image')
    }
    if (!this.__isEnabled(this.noLink)) {
      disabled.push('link')
    }
    if (disabled.length > 0) {
      md.disable(disabled)
    }

    if (this.__isFunction(this.extend)) {
      this.extend(md)
    }

    const rendered = md.render(markdown)

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
})

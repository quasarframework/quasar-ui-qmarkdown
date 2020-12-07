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
// import tocAndAnchor from 'markdown-it-toc-and-anchor'

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

import {
  QBtn,
  QTooltip,
  copyToClipboard
} from 'quasar'

const mdiContentCopy = 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'
const matDone = 'M0 0h24v24H0z@@fill:none;&&M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'

export default {
  name: 'QMarkdown',

  props: {
    // the markdown source, or use slot - slot overrides this property
    src: {
      type: String,
      default: ''
    },
    // no abbreviations
    noAbbreviation: Boolean,
    // no blockquotes
    noBlockquote: Boolean,
    // no breaks
    noBreaks: Boolean,
    // no containers
    noContainer: Boolean,
    // no Deflists
    noDeflist: Boolean,
    // no emojies
    noEmoji: Boolean,
    // no footnotes
    noFootnote: Boolean,
    // no code highlights
    noHighlight: Boolean,
    // no html entities
    noHtml: Boolean,
    // no images
    noImage: Boolean,
    // no inserts
    noInsert: Boolean,
    // no line-numbers
    noLineNumbers: Boolean,
    // no links
    noLink: Boolean,
    // no automatic links
    noLinkify: Boolean,
    // no marks
    noMark: Boolean,
    // no subscript
    noSubscript: Boolean,
    // no superscript
    noSuperscript: Boolean,
    // no tasklists
    noTasklist: Boolean,
    // no typographer
    noTypographer: Boolean,
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
    contentClass: [String, Object, Array],

    noNoopener: Boolean,
    noNoreferrer: Boolean,

    showCopy: Boolean,
    copyIcon: String,
    noCopyTooltip: Boolean,
    copyTooltipText: { // tooltip
      type: String,
      default: 'Copy to clipboard'
    },
    copyResponseText: {
      type: String,
      default: 'Copied to clipboard'
    }
  },

  data () {
    return {
      source: '',
      rendered: void 0
    }
  },

  created () {
    this.copy = mdiContentCopy
    this.done = matDone
  },

  beforeMount () {
    if (this.src && this.src.length > 0) {
      this.source = this.src.replace(/\\n/gi, '\n')
    }
  },

  destroyed () {
    // this.__deleteCache(this.uid)
  },

  watch: {
    src () {
      this.source = this.src.replace(/\\n/gi, '\n')
      this.rendered = void 0
    },
    noAbbreviation () { this.rendered = void 0 },
    noBlockquote () { this.rendered = void 0 },
    noBreaks () { this.rendered = void 0 },
    noContainer () { this.rendered = void 0 },
    noDeflist () { this.rendered = void 0 },
    noEmoji () { this.rendered = void 0 },
    noFootnote () { this.rendered = void 0 },
    noHighlight () { this.rendered = void 0 },
    noHtml () { this.rendered = void 0 },
    noImage () { this.rendered = void 0 },
    noInsert () { this.rendered = void 0 },
    noLineNumbers () { this.rendered = void 0 },
    noLink () { this.rendered = void 0 },
    noLinkify () { this.rendered = void 0 },
    noMark () { this.rendered = void 0 },
    noSubscript () { this.rendered = void 0 },
    noSuperscript () { this.rendered = void 0 },
    noTasklist () { this.rendered = void 0 },
    noTypographer () { this.rendered = void 0 },
    lineNumberAlt () { this.rendered = void 0 },
    toc () { this.rendered = void 0 },
    tocStart () { this.rendered = void 0 },
    tocEnd () { this.rendered = void 0 },
    taskListsEnable () { this.rendered = void 0 },
    taskListsLabel () { this.rendered = void 0 },
    taskListsLabelAfter () { this.rendered = void 0 },
    extend () { this.rendered = void 0 }
  },

  methods: {
    __isEnabled (val) {
      return val === void 0 || val === false
    },

    __isFunction (f) {
      return f && {}.toString.call(f) === '[object Function]'
    },

    // __setCache (key, value) {
    //   cache[key] = value
    // },

    // __getCache (key) {
    //   return cache[key]
    // },

    // __deleteCache (key) {
    //   if (cache[key]) {
    //     delete cache[key]
    //   }
    // },

    makeTree (list) {
      const tree = []
      let root = null

      const addToTree = (item) => {
        if (item.level === this.tocStart) {
          root = item
          tree.push(item)
        }
        else if (item.level === this.tocStart + 1) {
          root.children.push(item)
        }
        else {
          let parent = root
          for (let k = 0; k < item.level - (this.tocStart + 1); ++k) {
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
    },

    __copyMarkdownToClipboard () {
      // let markdown = this.source
      // if (this.$slots.default) {
      //   markdown = this.$slots.default[0].text
      // }

      copyToClipboard(this.$refs.markdown.innerText)

      if (this.$q.notify) {
        this.$q.notify({
          message: this.copyResponseText,
          color: this.$q.dark.isActive ? 'grey-10' : 'white',
          textColor: this.$q.dark.isActive ? 'amber' : 'primary',
          icon: this.done,
          position: 'top',
          timeout: 2000
        })
      }
    },

    __renderCopy (h) {
      if (this.showCopy !== true) return
      return h(QBtn, {
        staticClass: 'q-markdown__copy',
        props: {
          color: this.$q.dark.isActive ? 'amber' : 'primary',
          dense: true,
          flat: true,
          round: true,
          icon: (this.copyIcon ? this.copyIcon : this.copy)
        },
        on: {
          click: v => { this.__copyMarkdownToClipboard() }
        }
      }, [
        this.noCopyTooltip !== true && h(QTooltip, this.copyTooltipText)
      ])
    }
  },

  render (h) {
    if (this.rendered === void 0) {
      const tocData = []

      // get the markdown - slot overrides 'src'
      let markdown = this.source
      if (this.$slots.default) {
        markdown = this.$slots.default[0].text
      }

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

      extendBlockQuote(md)
      extendHeading(md, tocData, this.toc, this.tocStart, this.tocEnd)
      extendImage(md)
      extendLink(md, { noopener: !this.noNoopener, noreferrer: !this.noNoreferrer })
      extendTable(md)
      extendToken(md)

      if (this.__isEnabled(this.noContainer)) {
        extendContainers(md)
      }
      if (this.__isEnabled(this.noLineNumbers)) {
        extendFenceLineNumbers(md, this.lineNumberAlt)
      }

      // handle disabled rules
      const disabled = []
      if (!this.__isEnabled(this.noImage)) {
        disabled.push('image')
      }
      if (!this.__isEnabled(this.noLink)) {
        disabled.push('link')
      }
      if (!this.__isEnabled(this.noBlockquote)) {
        disabled.push('blockquote')
      }
      if (disabled.length > 0) {
        md.disable(disabled)
      }

      if (this.__isFunction(this.extend)) {
        this.extend(md)
      }

      this.rendered = md.render(markdown)

      if (this.toc && tocData.length > 0) {
        this.$emit('data', tocData)
      }
    }

    const renderedMarkdown = h('div', {
      ref: 'markdown',
      staticClass: 'q-markdown',
      class: this.contentClass,
      style: this.contentStyle,
      domProps: {
        innerHTML: this.rendered
      }
    })

    const renderedCopyWrapper = h('div', {
      style: {
        position: 'relative'
      }
    }, [
      renderedMarkdown,
      this.__renderCopy(h)
    ])

    return this.showCopy !== true ? renderedMarkdown : renderedCopyWrapper
  }
}

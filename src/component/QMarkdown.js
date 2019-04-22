import Vue from 'vue'

import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import container from 'markdown-it-container'
import taskLists from 'markdown-it-task-lists'
import imsize from 'markdown-it-imsize'
// import toc from 'markdown-it-toc-and-anchor'

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
    __slugify (str) {
      return encodeURIComponent(String(str).trim().replace(/\s+/g, '-'))
    },

    __extendBlockQuote (md) {
      md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx]

        token.attrSet('class', 'q-markdown--note')
        return self.renderToken(tokens, idx, options)
      }
    },

    __extendHeading (md, tocData) {
      md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx]

        const label = tokens[idx + 1]
          .children
          .reduce((acc, t) => acc + t.content, '')

        let classes = `q-markdown--heading-${token.tag}`

        if (token.markup === '=') {
          classes += ' q-markdown--title-heavy'
        }
        else if (token.markup === '-') {
          classes += ' q-markdown--title-light'
        }

        const id = this.__slugify(label)
        token.attrSet('id', id)
        token.attrSet('class', classes)

        if (this.toc) {
          const tokenNumber = parseInt(token.tag[1])

          if (this.tocStart && this.tocEnd && this.tocStart < this.tocEnd && tokenNumber >= this.tocStart && tokenNumber <= this.tocEnd) {
            tocData.push({ id: id, label: label, level: tokenNumber, children: [] })
          }
        }

        return self.renderToken(tokens, idx, options)
      }
    },

    __extendImage (md) {
      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]

        token.attrSet('class', 'q-markdown--image')
        return self.renderToken(tokens, idx, options)
      }
    },

    __extendTable (md) {
      md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
        const token = tokens[idx]

        token.attrSet('class', 'q-markdown--table')

        return self.renderToken(tokens, idx, options)
      }
    },

    __extendLink (md) {
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
    },
    __extendToken (md) {
      const defaultRender = md.renderer.rules.code_inline

      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const token = tokens[idx]

        token.attrSet('class', 'q-markdown--token')
        return defaultRender(tokens, idx, options, env, self)
      }
    },

    __createContainer (className, defaultTitle) {
      return [
        container,
        className,
        {
          render (tokens, idx) {
            const token = tokens[idx]
            const info = token.info.trim().slice(className.length).trim()
            if (token.nesting === 1) {
              return `<div class="q-markdown--note q-markdown--note--${className}"><p class="q-markdown--note-title">${info || defaultTitle}</p>\n`
            } else {
              return `</div>\n`
            }
          }
        }
      ]
    },

    __extendContainers (md) {
      if (this.__isEnabled(this.noContainer)) {
        md
          .use(...this.__createContainer('info', 'INFO'))
          .use(...this.__createContainer('tip', 'TIP'))
          .use(...this.__createContainer('warning', 'WARNING'))
          .use(...this.__createContainer('danger', 'IMPORTANT'))
          .use(...this.__createContainer('', ''))

          // explicitly escape Vue syntax
          .use(container, 'v-pre', {
            render: (tokens, idx) => tokens[idx].nesting === 1
              ? `<div v-pre>\n`
              : `</div>\n`
          })
      }
    },

    __isEnabled (val) {
      return val === void 0 || val === false
    },

    __buildTocTree (list) {
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
    let highlight = () => ''

    if (this.__isEnabled(this.noHighlight)) {
      // TODO: require? better import at top
      highlight = require('./highlight')
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
    const md = MarkdownIt(opts)
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
    this.__extendBlockQuote(md)
    this.__extendHeading(md, tocData)
    this.__extendImage(md)
    this.__extendLink(md)
    this.__extendTable(md)
    this.__extendToken(md)
    this.__extendContainers(md)

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

    const rendered = md.render(markdown)

    if (this.toc && tocData.length > 0) {
      this.$emit('data', tocData)
      let tocTree = this.__buildTocTree(tocData)
      this.$emit('tree', tocTree)
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

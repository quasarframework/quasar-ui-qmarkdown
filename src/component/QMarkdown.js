import Vue from 'vue'

// import slot from 'quasar/src/utils/slot.js'

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

const
  highlight = require('./highlight')

export default Vue.extend({
  name: 'QMarkdown',

  props: {
    // the markdown source, or use slot - slot overrides this property
    src: {
      type: String,
      default: ''
    },
    // set to true to enable Table of Contents (sent via emit)
    toc: Boolean,
    tocStart: {
      type: Number,
      validator: v => v >= 1 && v <= 5
    },
    tocEnd: {
      type: Number,
      validator: v => v >= 2 && v <= 6
    },
    // set to true to enable task lists checkboxes (not read-only)
    taskListsEnable: Boolean,
    // to wrap the rendered list items in a <label> element for UX purposes
    taskListsLabel: Boolean,
    // to add the label after the checkbox
    taskListsLabelAfter: Boolean
  },

  data () {
    return {
      source: this.src
    }
  },

  watch: {
    src (val) {
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

        const title = tokens[idx + 1]
          .children
          .reduce((acc, t) => acc + t.content, '')

        let classes = `q-markdown--heading-${token.tag}`

        if (token.markup === '=') {
          classes += ' q-markdown--title-heavy'
        }
        else if (token.markup === '-') {
          classes += ' q-markdown--title-light'
        }

        const id = this.__slugify(title)
        token.attrSet('id', id)
        token.attrSet('class', classes)

        if (this.toc) {
          const tokenNumber = parseInt(token.tag[1])
          if (this.tocStart && this.tocEnd && this.tocStart < this.tocEnd && tokenNumber >= this.tocStart && tokenNumber <= this.tocEnd) {
            tocData.push({ id: id, title: title, level: tokenNumber })
          } else {
            tocData.push({ id: id, title: title, level: tokenNumber })
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

  render (h) {
    // console.log('count:', this.count++)
    const opts = {
      html: true,
      linkify: true,
      typographer: true,
      breaks: true,
      highlight
    }

    const md = MarkdownIt(opts)
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)
      .use(emoji)
      .use(imsize)
      .use(taskLists, { enabled: this.taskListsEnable, label: this.taskListsLabel, labelAfter: this.taskListsLabelAfter })

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

    const rendered = md.render(markdown)
    console.log('tocData:', tocData)

    if (this.toc && tocData.length > 0) {
      this.$emit('toc', tocData)
    }

    return h('div', {
      staticClass: 'q-markdown',
      domProps: {
        innerHTML: rendered
      }
    })
    // return null
  }
})

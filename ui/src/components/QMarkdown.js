import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeMount,
  onUnmounted,
  ref,
  watch
} from 'vue'

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
  copyToClipboard,
  useQuasar
} from 'quasar'

export default defineComponent({
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
    // no heading (h1-h6) anchor (#) links
    noHeadingAnchorLinks: Boolean,
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
      validator: v => v >= 1 && v <= 6
    },
    tocEnd: {
      type: Number,
      default: 3,
      validator: v => v >= 1 && v <= 6
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
    contentStyle: [ String, Object, Array ],
    contentClass: [ String, Object, Array ],

    noNoopener: Boolean,
    noNoreferrer: Boolean,

    showCopy: Boolean,
    copyIcon: String,
    noCopyTooltip: Boolean,
    doneIcon: String,
    copyTooltipText: { // tooltip
      type: String,
      default: 'Copy to clipboard'
    },
    copyResponseText: {
      type: String,
      default: 'Copied to clipboard'
    },
    fixCr: Boolean
  },

  emits: [
    'data'
  ],

  setup (props, { slots, emit, expose }) {
    const $q = useQuasar(),
      rendered = ref(null),
      source = ref(null),
      markdownRef = ref(null)

    const vm = getCurrentInstance()
    if (vm === null) {
      throw new Error('current instance is null')
    }

    onBeforeMount(() => {
      if (props.src && props.src.length > 0) {
        source.value = props.fixCr ? props.src.replace(/\\n/gi, '\n') : props.src
      }
    })

    onUnmounted(() => {
      // __deleteCache(this.uid)
    })

    const parsedCopyIcon = computed(() => {
      // default mdiContentCopy
      return props.copyIcon
        ? props.copyIcon
        : 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'
    })

    const parsedDoneIcon = computed(() => {
      // default matDone
      return props.doneIcon
        ? props.doneIcon
        : 'M0 0h24v24H0z@@fill:none;&&M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
    })

    watch(() => props.src, val => {
      source.value = props.fixCr ? props.src.replace(/\\n/gi, '\n') : props.src

      rendered.value = null
    })

    watch(() => props.noAbbreviation, val => {
      rendered.value = null
    })

    watch(() => props.noBlockquote, val => {
      rendered.value = null
    })

    watch(() => props.noBreaks, val => {
      rendered.value = null
    })

    watch(() => props.noContainer, val => {
      rendered.value = null
    })

    watch(() => props.noDeflist, val => {
      rendered.value = null
    })

    watch(() => props.noEmoji, val => {
      rendered.value = null
    })

    watch(() => props.noFootnote, val => {
      rendered.value = null
    })

    watch(() => props.noHighlight, val => {
      rendered.value = null
    })

    watch(() => props.noHtml, val => {
      rendered.value = null
    })

    watch(() => props.noImage, val => {
      rendered.value = null
    })

    watch(() => props.noInsert, val => {
      rendered.value = null
    })

    watch(() => props.noLineNumbers, val => {
      rendered.value = null
    })

    watch(() => props.noLink, val => {
      rendered.value = null
    })

    watch(() => props.noLinkify, val => {
      rendered.value = null
    })

    watch(() => props.noHeadingAnchorLinks, val => {
      rendered.value = null
    })

    watch(() => props.noMark, val => {
      rendered.value = null
    })

    watch(() => props.noSubscript, val => {
      rendered.value = null
    })

    watch(() => props.noSuperscript, val => {
      rendered.value = null
    })

    watch(() => props.noTasklist, val => {
      rendered.value = null
    })

    watch(() => props.noTypographer, val => {
      rendered.value = null
    })

    watch(() => props.lineNumberAlt, val => {
      rendered.value = null
    })

    watch(() => props.toc, val => {
      rendered.value = null
    })

    watch(() => props.tocStart, val => {
      rendered.value = null
    })

    watch(() => props.tocEnd, val => {
      rendered.value = null
    })

    watch(() => props.taskListsEnable, val => {
      rendered.value = null
    })

    watch(() => props.taskListsLabel, val => {
      rendered.value = null
    })

    watch(() => props.taskListsLabelAfter, val => {
      rendered.value = null
    })

    watch(() => props.extend, val => {
      rendered.value = null
    })

    watch(() => props.contentStyle, val => {
      rendered.value = null
    })

    watch(() => props.contentClass, val => {
      rendered.value = null
    })

    watch(() => props.noNoopener, val => {
      rendered.value = null
    })

    watch(() => props.noNoreferrer, val => {
      rendered.value = null
    })

    // TODO:: Jeff - can all of the above watches be replaced with
    // watch(() => props, val => {
    //   rendered.value = null
    // })

    function __isEnabled (val) {
      return val === void 0 || val === false
    }

    function __isFunction (f) {
      return f && {}.toString.call(f) === '[object Function]'
    }

    // function __setCache (key, value) {
    //   cache[key] = value
    // }

    // function __getCache (key) {
    //   return cache[key]
    // }

    // function __deleteCache (key) {
    //   if (cache[key]) {
    //     delete cache[key]
    //   }
    // }

    function makeTree (list) {
      const tree = []
      let root = null

      const addToTree = (item) => {
        if (item.level === props.tocStart) {
          root = item
          tree.push(item)
        }
        else if (item.level === props.tocStart + 1) {
          root.children.push(item)
        }
        else {
          let parent = root
          for (let k = 0; k < item.level - (props.tocStart + 1); ++k) {
            parent = parent.children[ parent.children.length - 1 ]
          }
          if (parent) {
            parent.children.push(item)
          }
        }
      }

      for (let i = 0; i < list.length; ++i) {
        addToTree(list[ i ])
      }

      return tree
    }

    function __copyMarkdownToClipboard () {
      let markdown = source.value
      if (slots.default !== undefined && slots.default()[ 0 ].children.trim().length > 0) {
        markdown = slots.default()[ 0 ].children
      }

      copyToClipboard(markdownRef.value.innerText)

      if ($q.notify) {
        $q.notify({
          message: props.copyResponseText,
          color: $q.dark.isActive ? 'grey-10' : 'white',
          textColor: $q.dark.isActive ? 'amber' : 'primary',
          icon: parsedDoneIcon.value,
          position: 'top',
          timeout: 2000
        })
      }
    }

    function __renderCopy () {
      if (props.showCopy !== true) return
      return h(QBtn, {
        class: 'q-markdown__copy',
        color: $q.dark.isActive ? 'amber' : 'primary',
        dense: true,
        flat: true,
        round: true,
        icon: parsedCopyIcon.value,
        onClick: v => { __copyMarkdownToClipboard() }
      }, [
        props.noCopyTooltip !== true && h(QTooltip, props.copyTooltipText)
      ])
    }

    function __renderMarkdown () {
      if (rendered.value === null) {
        const tocData = []

        // get the markdown - slot overrides 'src'
        let markdown = source.value || ''
        if (slots.default !== undefined && slots.default()[ 0 ].children.trim().length > 0) {
          markdown = slots.default()[ 0 ].children.replace(/\\ /g, '\n').replace(/'/g, '')
        }

        if (__isFunction(props.extendPrism)) {
          props.extendPrism(Prism)
        }

        const highlight = (str, lang) => {
          if (__isEnabled(props.noHighlight)) {
            return prismHighlight(Prism, str, lang)
          }
          return str
        }

        const opts = {
          html: __isEnabled(props.noHtml),
          linkify: __isEnabled(props.noLinkify),
          typographer: __isEnabled(props.noTypographer),
          breaks: __isEnabled(props.noBreaks),
          highlight: highlight
        }

        const md = markdownIt(opts)

        if (__isEnabled(props.noSubscript)) {
          md.use(subscript)
        }
        if (__isEnabled(props.noSuperscript)) {
          md.use(superscript)
        }
        if (__isEnabled(props.noFootnote)) {
          md.use(footnote)
        }
        if (__isEnabled(props.noDeflist)) {
          md.use(deflist)
        }
        if (__isEnabled(props.noAbbreviation)) {
          md.use(abbreviation)
        }
        if (__isEnabled(props.noInsert)) {
          md.use(insert)
        }
        if (__isEnabled(props.noMark)) {
          md.use(mark)
        }
        if (__isEnabled(props.noEmoji)) {
          md.use(emoji)
        }
        if (__isEnabled(props.noImage)) {
          md.use(imsize)
        }
        if (__isEnabled(props.noTasklist)) {
          md.use(taskLists, { enabled: props.taskListsEnable, label: props.taskListsLabel, labelAfter: props.taskListsLabelAfter })
        }

        extendBlockQuote(md)
        extendHeading(md, tocData, props.toc, props.tocStart, props.tocEnd, props.noHeadingAnchorLinks)
        extendImage(md)
        extendLink(md, { noopener: !props.noNoopener, noreferrer: !props.noNoreferrer })
        extendTable(md)
        extendToken(md)

        if (__isEnabled(props.noContainer)) {
          extendContainers(md)
        }
        if (__isEnabled(props.noLineNumbers)) {
          extendFenceLineNumbers(md, props.lineNumberAlt)
        }

        // handle disabled rules
        const disabled = []
        if (!__isEnabled(props.noImage)) {
          disabled.push('image')
        }
        if (!__isEnabled(props.noLink)) {
          disabled.push('link')
        }
        if (!__isEnabled(props.noBlockquote)) {
          disabled.push('blockquote')
        }
        if (disabled.length > 0) {
          md.disable(disabled)
        }

        if (__isFunction(props.extend)) {
          props.extend(md)
        }

        rendered.value = md.render(markdown)

        if (props.toc && tocData.length > 0) {
          emit('data', tocData)
        }
      }

      const renderedMarkdown = h('div', {
        ref: markdownRef,
        class: {
          'q-markdown': true,
          ...props.contentClass
        },
        style: props.contentStyle,
        innerHTML: rendered.value
      })

      const renderedCopyWrapper = h('div', {
        style: {
          position: 'relative'
        }
      }, [
        renderedMarkdown,
        __renderCopy(h)
      ])

      return props.showCopy !== true ? renderedMarkdown : renderedCopyWrapper
    }

    // expose public methods
    expose({
      makeTree
    })
    // Object.assign(vm.proxy, {
    //   makeTree
    // })

    return () => __renderMarkdown()
  }
})

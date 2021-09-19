import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeMount,
  ref,
  reactive,
  watch
} from 'vue'

import markdownIt from 'markdown-it'

import imsize from 'markdown-it-imsize/dist/markdown-it-imsize.js'

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

// QMarkdown global properties
const globalProps = reactive({})

// Composition function to set global properties
export function useQMarkdownGlobalProps(props) {
  // remove existing data
  for (const key in globalProps) {
    delete globalProps[ key ]
  }

  // add the new props
  for (const key in props) {
    globalProps[ key ] = props[ key ]
  }
}

export default defineComponent({
  name: 'QMarkdown',

  props: {
    // the markdown source, or use slot - slot overrides this property
    src: {
      type: String,
      default: ''
    },
    // no blockquotes
    noBlockquote: Boolean,
    // no breaks
    noBreaks: Boolean,
    // no containers
    noContainer: Boolean,
    // no code highlights
    noHighlight: Boolean,
    // no html entities
    noHtml: Boolean,
    // no images
    noImage: Boolean,
    // no line-numbers
    noLineNumbers: Boolean,
    // no links
    noLink: Boolean,
    // no automatic links
    noLinkify: Boolean,
    // no heading (h1-h6) anchor (#) links
    noHeadingAnchorLinks: Boolean,
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

    contentStyle: [ Object, Array ],
    contentClass: [ Object, Array ],

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
    fixCr: Boolean,

    // markdown-it plugins
    plugins: {
      type: Array,
      default: () => []
    }
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
      if (allProps.value.src && allProps.value.src.length > 0) {
        source.value = allProps.value.fixCr ? allProps.value.src.replace(/\\n/gi, '\n') : allProps.value.src
      }
    })

    const allProps = computed(() => {
      return { ...props, ...globalProps }
    })

    const parsedCopyIcon = computed(() => {
      // default mdiContentCopy
      return allProps.value.copyIcon
        ? allProps.value.copyIcon
        : 'M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z'
    })

    const parsedDoneIcon = computed(() => {
      // default matDone
      return allProps.value.doneIcon
        ? allProps.value.doneIcon
        : 'M0 0h24v24H0z@@fill:none;&&M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'
    })

    watch(() => allProps.value.src, val => {
      source.value = allProps.value.fixCr ? allProps.value.src.replace(/\\n/gi, '\n') : allProps.value.src

      rendered.value = null
    })

    watch(() => [
      allProps.value.noBlockquote,
      allProps.value.noBreaks,
      allProps.value.noContainer,
      allProps.value.noHighlight,
      allProps.value.noHtml,
      allProps.value.noImage,
      allProps.value.noLineNumbers,
      allProps.value.noLink,
      allProps.value.noLinkify,
      allProps.value.noHeadingAnchorLinks,
      allProps.value.noTypographer,
      allProps.value.lineNumberAlt,
      allProps.value.toc,
      allProps.value.tocStart,
      allProps.value.tocEnd,
      allProps.value.contentStyle,
      allProps.value.contentClass,
      allProps.value.noNoopener,
      allProps.value.noNoreferrer,
      allProps.value.plugins
     ], () => {
      rendered.value = null
    })

    function __isEnabled (val) {
      return val === void 0 || val === false
    }

    function makeTree (list) {
      const tree = []
      let root = null

      const addToTree = (item) => {
        if (item.level === allProps.value.tocStart) {
          root = item
          tree.push(item)
        }
        else if (item.level === allProps.value.tocStart + 1) {
          root.children.push(item)
        }
        else {
          let parent = root
          for (let k = 0; k < item.level - (allProps.value.tocStart + 1); ++k) {
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
          message: allProps.value.copyResponseText,
          color: $q.dark.isActive ? 'grey-10' : 'white',
          textColor: $q.dark.isActive ? 'amber' : 'primary',
          icon: parsedDoneIcon.value,
          position: 'top',
          timeout: 2000
        })
      }
    }

    function __renderCopy () {
      if (allProps.value.showCopy !== true) return
      return h(QBtn, {
        class: 'q-markdown__copy',
        color: $q.dark.isActive ? 'amber' : 'primary',
        dense: true,
        flat: true,
        round: true,
        icon: parsedCopyIcon.value,
        onClick: v => { __copyMarkdownToClipboard() }
      }, () => [allProps.value.noCopyTooltip !== true && h(QTooltip, () => allProps.value.copyTooltipText)])
    }

    function __renderMarkdown () {
      if (rendered.value === null) {
        const tocData = []

        // get the markdown - slot overrides 'src'
        let markdown = source.value || ''
        if (slots.default !== undefined && slots.default()[ 0 ].children.trim().length > 0) {
          markdown = slots.default()[ 0 ].children.replace(/\\ /g, '\n').replace(/'/g, '')
        }

        const highlight = (str, lang) => {
          if (__isEnabled(allProps.value.noHighlight)) {
            return prismHighlight(Prism, str, lang)
          }
          return str
        }

        const opts = {
          html: __isEnabled(allProps.value.noHtml),
          linkify: __isEnabled(allProps.value.noLinkify),
          typographer: __isEnabled(allProps.value.noTypographer),
          breaks: __isEnabled(allProps.value.noBreaks),
          highlight: highlight
        }

        const md = markdownIt(opts)

        if (__isEnabled(allProps.value.noImage)) {
          md.use(imsize)
        }

        extendBlockQuote(md)
        extendHeading(md, tocData, allProps.value.toc, allProps.value.tocStart, allProps.value.tocEnd, allProps.value.noHeadingAnchorLinks)
        extendImage(md)
        extendLink(md, { noopener: !allProps.value.noNoopener, noreferrer: !allProps.value.noNoreferrer })
        extendTable(md)
        extendToken(md)

        if (__isEnabled(allProps.value.noContainer)) {
          extendContainers(md)
        }
        if (__isEnabled(allProps.value.noLineNumbers)) {
          extendFenceLineNumbers(md, allProps.value.lineNumberAlt)
        }

        // handle disabled rules
        const disabled = []
        if (!__isEnabled(allProps.value.noImage)) {
          disabled.push('image')
        }
        if (!__isEnabled(allProps.value.noLink)) {
          disabled.push('link')
        }
        if (!__isEnabled(allProps.value.noBlockquote)) {
          disabled.push('blockquote')
        }
        if (disabled.length > 0) {
          md.disable(disabled)
        }

        if (allProps.value.plugins.length > 0) {
          allProps.value.plugins.forEach(plugin => {
            md.use(plugin)
          })
        }

        rendered.value = md.render(markdown)

        if (allProps.value.toc && tocData.length > 0) {
          emit('data', tocData)
        }
      }

      const renderedMarkdown = h('div', {
        ref: markdownRef,
        class: {
          'q-markdown': true,
          ...allProps.value.contentClass
        },
        style: allProps.value.contentStyle,
        innerHTML: rendered.value
      })

      const renderedCopyWrapper = h('div', {
        style: {
          position: 'relative'
        }
      }, [
        renderedMarkdown,
        __renderCopy()
      ])

      return allProps.value.showCopy !== true ? renderedMarkdown : renderedCopyWrapper
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

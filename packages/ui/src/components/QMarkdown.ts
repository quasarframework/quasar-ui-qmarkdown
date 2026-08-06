import {
  computed,
  defineComponent,
  h,
  ref,
  reactive,
  watch,
  type PropType,
  type SlotsType,
  type VNode,
} from 'vue'
import type {
  MarkdownItPlugin,
  MarkdownItLinkifyOptions,
  MarkdownItPluginsArray,
  TocDefinitionArray,
  VueClassProp,
  VueStyleProp,
} from '../../types/types'

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
import makeTreeUtil from '../util/makeTree.js'
import type { TocNode } from '../util/makeTree.js'
import normalizeSlotSource from '../util/normalizeSlotSource.js'

import { QBtn, QTooltip, copyToClipboard, useQuasar } from 'quasar'

// QMarkdown global properties
const globalProps = reactive<Record<string, any>>({})

interface QMarkdownSlots {
  /**
   * Default markdown content. QMarkdown removes common template indentation before rendering so slotted markdown can be formatted naturally inside Vue templates.
   */
  default: () => VNode[]
}

export function getMarkdownCopyText(element: HTMLElement | null | undefined): string {
  if (!element) return ''

  const lineNumberElements = Array.from(
    element.querySelectorAll<HTMLElement>('.q-markdown--line-numbers'),
  )
  const previousDisplayValues = lineNumberElements.map((lineNumbers) => lineNumbers.style.display)

  lineNumberElements.forEach((lineNumbers) => {
    lineNumbers.style.display = 'none'
  })

  try {
    return element.innerText ?? element.textContent ?? ''
  } finally {
    lineNumberElements.forEach((lineNumbers, index) => {
      lineNumbers.style.display = previousDisplayValues[index] ?? ''
    })
  }
}

// Composition function to set global properties
export function useQMarkdownGlobalProps(props: Record<string, any>): void {
  // remove existing data
  for (const key in globalProps) {
    delete globalProps[key]
  }

  // add the new props
  for (const key in props) {
    globalProps[key] = props[key]
  }
}

export default defineComponent({
  name: 'QMarkdown',

  slots: Object as SlotsType<QMarkdownSlots>,

  props: {
    /**
     * Optional markdown source passed as a prop. Slotted markdown content overrides this value when both are provided.
     *
     * @category model
     * @example src="Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:"
     */
    src: {
      type: String,
      default: '',
    },
    /**
     * Disable blockquote conversion.
     *
     * @category content
     */
    noBlockquote: Boolean,
    /**
     * Disable conversion of `\n` into `<br>`.
     *
     * @category content
     */
    noBreaks: Boolean,
    /**
     * Disable QMarkdown's custom `:::` container block parser.
     *
     * @category content
     * @example :no-container="true"
     */
    noContainer: Boolean,
    /**
     * Disable code highlighting.
     *
     * @category content
     */
    noHighlight: Boolean,
    /**
     * Disable HTML tags in source markdown.
     *
     * @category content
     */
    noHtml: Boolean,
    /**
     * Disable image conversion.
     *
     * @category content
     */
    noImage: Boolean,
    /**
     * Disable line numbers on code blocks.
     *
     * @category content
     */
    noLineNumbers: Boolean,
    /**
     * Disable conversion of links.
     *
     * @category content
     */
    noLink: Boolean,
    /**
     * Disable auto-conversion of URL-like text into links.
     *
     * @category content
     */
    noLinkify: Boolean,
    /**
     * Options passed to markdown-it's linkifier. For example, enable links without a protocol with `{ fuzzyLink: true }`.
     *
     * @category content
     * @tsType MarkdownItLinkifyOptions
     * @example :linkify-options="{ fuzzyLink: true }"
     */
    linkifyOptions: {
      type: Object as PropType<MarkdownItLinkifyOptions>,
      default: () => ({}),
    },
    /**
     * Disable automatic heading anchor links.
     *
     * @category content
     */
    noHeadingAnchorLinks: Boolean,
    /**
     * Disable language-neutral replacements and quote beautification.
     *
     * @category content
     */
    noTypographer: Boolean,
    /**
     * Alternative single character to display instead of generated line numbers.
     *
     * @category content
     * @example line-number-alt="$"
     * @example line-number-alt=">"
     */
    lineNumberAlt: {
      type: String,
      validator: (v: string) => v.length === 1,
    },
    /**
     * Enable table-of-contents generation and emit the generated TOC data.
     *
     * @category behavior
     */
    toc: Boolean,
    /**
     * Render markdown as inline content with `markdown-it.renderInline()` and a `span` root. Useful when QMarkdown is used inside existing paragraph or text structure.
     *
     * @category content
     */
    inline: Boolean,
    /**
     * Starting heading level for table-of-contents generation.
     *
     * @category behavior
     * @values 1 | 2 | 3 | 4 | 5 | 6
     */
    tocStart: {
      type: Number,
      default: 1,
      validator: (v: number) => v >= 1 && v <= 6,
    },
    /**
     * Ending heading level for table-of-contents generation.
     *
     * @category behavior
     * @values 1 | 2 | 3 | 4 | 5 | 6
     */
    tocEnd: {
      type: Number,
      default: 3,
      validator: (v: number) => v >= 1 && v <= 6,
    },

    /**
     * Style definitions applied to the rendered markdown container.
     *
     * @category style
     * @tsType VueStyleProp
     * @example background-color: #ff0000
     * @example :content-style="{ backgroundColor: '#ff0000' }"
     */
    contentStyle: [Object, Array, String] as PropType<VueStyleProp>,
    /**
     * Class definitions applied to the rendered markdown container.
     *
     * @category style
     * @tsType VueClassProp
     * @example my-special-class
     * @example :content-class="{ 'my-special-class': condition }"
     */
    contentClass: [Object, Array, String] as PropType<VueClassProp>,

    /**
     * Prevent QMarkdown from adding `rel="noopener"` to external links.
     *
     * @category behavior
     */
    noNoopener: Boolean,
    /**
     * Prevent QMarkdown from adding `rel="noreferrer"` to external links.
     *
     * @category behavior
     */
    noNoreferrer: Boolean,

    /**
     * Show the copy-to-clipboard button for rendered markdown content.
     *
     * @category behavior
     */
    showCopy: Boolean,
    /**
     * Icon used for the copy-to-clipboard button.
     *
     * @category behavior
     * @example copy-icon="copy"
     * @example :copy-icon="matCopy"
     */
    copyIcon: String,
    /**
     * Hide the copy-to-clipboard tooltip.
     *
     * @category behavior
     */
    noCopyTooltip: Boolean,
    /**
     * Icon used in the notify response after content is copied.
     *
     * @category behavior
     * @example done-icon="done"
     * @example :done-icon="matDone"
     * @since v2.0.0-beta.1
     */
    doneIcon: String,
    /**
     * Tooltip text for the copy-to-clipboard button.
     *
     * @category behavior
     * @example copy-tooltip-text="Click here for content to be copied to the clipboard"
     * @example :copy-tooltip-text="$t('copy-tooltip-text')"
     */
    copyTooltipText: {
      type: String,
      default: 'Copy to clipboard',
    },
    /**
     * Notify text shown after content is copied. The Quasar Notify plugin must be installed for the response to display.
     *
     * @category behavior
     * @example copy-response-text="The content was copied to the clipboard"
     * @example :copy-response-text="$t('copy-response-text')"
     */
    copyResponseText: {
      type: String,
      default: 'Copied to clipboard',
    },
    /**
     * Replace escaped `\n` sequences in the `src` prop with real newline characters before rendering.
     *
     * @category behavior
     */
    fixCr: Boolean,

    /**
     * Optional array of `markdown-it` plugins or plugin configuration objects.
     *
     * @category extend
     * @api-exemption examples
     */
    plugins: {
      type: Array as PropType<MarkdownItPluginsArray>,
      default: () => [],
    },
  },

  emits: [
    /**
     * Emitted when `toc` is true and a table of contents is generated.
     *
     * @param tocData Generated table-of-contents entries.
     * @param-type tocData Array
     * @param-tsType tocData TocDefinitionArray
     */
    'data',
  ],

  setup(props, { slots, emit, expose }) {
    const $q = useQuasar()
    const rendered = ref<string | null>(null),
      markdownRef = ref<HTMLElement | null>(null)

    const allProps = computed<Record<string, any>>(() => {
      return { ...props, ...globalProps }
    })

    const rawSource = computed(() => {
      let rawSource = ''
      if (allProps.value.src && allProps.value.src.length > 0) {
        rawSource = allProps.value.fixCr
          ? allProps.value.src.replace(/\\n/gi, '\n')
          : allProps.value.src
      }
      const slotSource = slots.default?.()[0]?.children
      if (typeof slotSource === 'string' && slotSource.trim().length > 0) {
        rawSource = normalizeSlotSource(slotSource)
      }
      return rawSource
    })

    watch(rawSource, () => {
      rendered.value = null
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

    watch(
      () => [
        allProps.value.noBlockquote,
        allProps.value.noBreaks,
        allProps.value.noContainer,
        allProps.value.noHighlight,
        allProps.value.noHtml,
        allProps.value.noImage,
        allProps.value.noLineNumbers,
        allProps.value.noLink,
        allProps.value.noLinkify,
        allProps.value.linkifyOptions,
        allProps.value.noHeadingAnchorLinks,
        allProps.value.noTypographer,
        allProps.value.lineNumberAlt,
        allProps.value.toc,
        allProps.value.inline,
        allProps.value.tocStart,
        allProps.value.tocEnd,
        allProps.value.contentStyle,
        allProps.value.contentClass,
        allProps.value.noNoopener,
        allProps.value.noNoreferrer,
        allProps.value.plugins,
      ],
      () => {
        rendered.value = null
      },
    )

    function __isEnabled(val: unknown): boolean {
      return val === void 0 || val === false
    }

    /**
     * Transform flat table-of-contents entries into a hierarchical tree.
     *
     * @param data The results from the `data` event.
     * @returns A hierarchical version of the passed TOC data.
     */
    function makeTree(data: TocDefinitionArray): TocDefinitionArray {
      return makeTreeUtil(data as TocNode[], allProps.value.tocStart)
    }

    function __copyMarkdownToClipboard() {
      copyToClipboard(getMarkdownCopyText(markdownRef.value as HTMLElement | null))

      if ($q.notify) {
        $q.notify({
          message: allProps.value.copyResponseText,
          color: $q.dark.isActive ? 'grey-10' : 'white',
          textColor: $q.dark.isActive ? 'amber' : 'primary',
          icon: parsedDoneIcon.value,
          position: 'top',
          timeout: 2000,
        })
      }
    }

    function __renderCopy() {
      if (allProps.value.showCopy !== true) return
      return h(
        QBtn,
        {
          class: 'q-markdown__copy',
          color: $q.dark.isActive ? 'amber' : 'primary',
          dense: true,
          flat: true,
          round: true,
          icon: parsedCopyIcon.value,
          onClick: () => {
            __copyMarkdownToClipboard()
          },
        },
        () => [
          allProps.value.noCopyTooltip !== true &&
            h(QTooltip, () => allProps.value.copyTooltipText),
        ],
      )
    }

    function __renderMarkdown() {
      if (rendered.value === null) {
        const tocData: TocNode[] = []

        // get the markdown - slot overrides 'src'
        const markdown = rawSource.value || ''
        const highlight = (str: string, lang: string): string => {
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
          highlight: highlight,
        }

        const md = markdownIt(opts)

        md.linkify.set(allProps.value.linkifyOptions)

        md.use(imsize)

        extendBlockQuote(md)
        extendHeading(
          md,
          tocData,
          allProps.value.toc,
          allProps.value.tocStart,
          allProps.value.tocEnd,
          allProps.value.noHeadingAnchorLinks,
        )
        extendImage(md, {
          disabled: !__isEnabled(allProps.value.noImage),
        })
        extendLink(md, {
          noopener: !allProps.value.noNoopener,
          noreferrer: !allProps.value.noNoreferrer,
        })
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
          allProps.value.plugins.forEach((plugin: unknown) => {
            if (typeof plugin === 'function') {
              md.use(plugin as MarkdownItPlugin)
            } else {
              const pluginConfig = plugin as {
                plugin?: MarkdownItPlugin
                options?: unknown
              }
              if (typeof pluginConfig.plugin === 'function' && pluginConfig.options) {
                md.use(pluginConfig.plugin, pluginConfig.options)
              }
            }
          })
        }

        rendered.value =
          allProps.value.inline === true ? md.renderInline(markdown) : md.render(markdown)

        if (allProps.value.toc && tocData.length > 0) {
          emit('data', tocData)
        }
      }

      const renderedMarkdown = h(allProps.value.inline === true ? 'span' : 'div', {
        ref: markdownRef,
        class: [
          'q-markdown',
          allProps.value.inline === true ? 'q-markdown--inline' : void 0,
          allProps.value.contentClass,
        ],
        style: allProps.value.contentStyle,
        innerHTML: rendered.value,
      })

      const renderedCopyWrapper = h(
        allProps.value.inline === true ? 'span' : 'div',
        {
          style: {
            position: 'relative',
          },
        },
        [renderedMarkdown, __renderCopy()],
      )

      return allProps.value.showCopy !== true ? renderedMarkdown : renderedCopyWrapper
    }

    // expose public methods
    expose({
      makeTree,
    })

    return () => __renderMarkdown()
  },
})

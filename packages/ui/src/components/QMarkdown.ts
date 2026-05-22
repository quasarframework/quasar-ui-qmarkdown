import { computed, defineComponent, h, ref, reactive, watch } from "vue";
import type { PluginSimple, PluginWithOptions } from "markdown-it";

import markdownIt from "markdown-it";

import imsize from "markdown-it-imsize/dist/markdown-it-imsize.js";

import Prism from "prismjs";
import prismHighlight from "../util/highlight.js";

import extendBlockQuote from "../util/extendBlockQuote.js";
import extendContainers from "../util/extendContainers.js";
import extendHeading from "../util/extendHeading.js";
import extendImage from "../util/extendImage.js";
import extendLink from "../util/extendLink.js";
import extendTable from "../util/extendTable.js";
import extendToken from "../util/extendToken.js";
import extendFenceLineNumbers from "../util/extendFenceLineNumbers.js";
import makeTreeUtil from "../util/makeTree.js";
import type { TocNode } from "../util/makeTree.js";
import normalizeSlotSource from "../util/normalizeSlotSource.js";

import { QBtn, QTooltip, copyToClipboard, useQuasar } from "quasar";

// QMarkdown global properties
const globalProps = reactive<Record<string, any>>({});

export function getMarkdownCopyText(element: HTMLElement | null | undefined): string {
  if (!element) return "";

  const lineNumberElements = Array.from(
    element.querySelectorAll<HTMLElement>(".q-markdown--line-numbers"),
  );
  const previousDisplayValues = lineNumberElements.map((lineNumbers) => lineNumbers.style.display);

  lineNumberElements.forEach((lineNumbers) => {
    lineNumbers.style.display = "none";
  });

  try {
    return element.innerText ?? element.textContent ?? "";
  } finally {
    lineNumberElements.forEach((lineNumbers, index) => {
      lineNumbers.style.display = previousDisplayValues[index] ?? "";
    });
  }
}

// Composition function to set global properties
export function useQMarkdownGlobalProps(props: Record<string, any>): void {
  // remove existing data
  for (const key in globalProps) {
    delete globalProps[key];
  }

  // add the new props
  for (const key in props) {
    globalProps[key] = props[key];
  }
}

export default defineComponent({
  name: "QMarkdown",

  props: {
    // the markdown source, or use slot - slot overrides this property
    src: {
      type: String,
      default: "",
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
      validator: (v: string) => v.length === 1,
    },
    // set to true to enable Table of Contents (sent via emit)
    toc: Boolean,
    tocStart: {
      type: Number,
      default: 1,
      validator: (v: number) => v >= 1 && v <= 6,
    },
    tocEnd: {
      type: Number,
      default: 3,
      validator: (v: number) => v >= 1 && v <= 6,
    },

    contentStyle: [Object, Array, String],
    contentClass: [Object, Array, String],

    noNoopener: Boolean,
    noNoreferrer: Boolean,

    showCopy: Boolean,
    copyIcon: String,
    noCopyTooltip: Boolean,
    doneIcon: String,
    copyTooltipText: {
      // tooltip
      type: String,
      default: "Copy to clipboard",
    },
    copyResponseText: {
      type: String,
      default: "Copied to clipboard",
    },
    fixCr: Boolean,

    // markdown-it plugins
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  emits: ["data"],

  setup(props, { slots, emit, expose }) {
    const $q = useQuasar();
    const rendered = ref<string | null>(null),
      markdownRef = ref<HTMLElement | null>(null);

    const allProps = computed<Record<string, any>>(() => {
      return { ...props, ...globalProps };
    });

    const rawSource = computed(() => {
      let rawSource = "";
      if (allProps.value.src && allProps.value.src.length > 0) {
        rawSource = allProps.value.fixCr
          ? allProps.value.src.replace(/\\n/gi, "\n")
          : allProps.value.src;
      }
      const slotSource = slots.default?.()[0]?.children;
      if (typeof slotSource === "string" && slotSource.trim().length > 0) {
        rawSource = normalizeSlotSource(slotSource);
      }
      return rawSource;
    });

    watch(rawSource, () => {
      rendered.value = null;
    });

    const parsedCopyIcon = computed(() => {
      // default mdiContentCopy
      return allProps.value.copyIcon
        ? allProps.value.copyIcon
        : "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z";
    });

    const parsedDoneIcon = computed(() => {
      // default matDone
      return allProps.value.doneIcon
        ? allProps.value.doneIcon
        : "M0 0h24v24H0z@@fill:none;&&M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z";
    });

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
        allProps.value.plugins,
      ],
      () => {
        rendered.value = null;
      },
    );

    function __isEnabled(val: unknown): boolean {
      return val === void 0 || val === false;
    }

    function makeTree(list: TocNode[]): TocNode[] {
      return makeTreeUtil(list, allProps.value.tocStart);
    }

    function __copyMarkdownToClipboard() {
      copyToClipboard(getMarkdownCopyText(markdownRef.value as HTMLElement | null));

      if ($q.notify) {
        $q.notify({
          message: allProps.value.copyResponseText,
          color: $q.dark.isActive ? "grey-10" : "white",
          textColor: $q.dark.isActive ? "amber" : "primary",
          icon: parsedDoneIcon.value,
          position: "top",
          timeout: 2000,
        });
      }
    }

    function __renderCopy() {
      if (allProps.value.showCopy !== true) return;
      return h(
        QBtn,
        {
          class: "q-markdown__copy",
          color: $q.dark.isActive ? "amber" : "primary",
          dense: true,
          flat: true,
          round: true,
          icon: parsedCopyIcon.value,
          onClick: () => {
            __copyMarkdownToClipboard();
          },
        },
        () => [
          allProps.value.noCopyTooltip !== true &&
            h(QTooltip, () => allProps.value.copyTooltipText),
        ],
      );
    }

    function __renderMarkdown() {
      if (rendered.value === null) {
        const tocData: TocNode[] = [];

        // get the markdown - slot overrides 'src'
        const markdown = rawSource.value || "";
        const highlight = (str: string, lang: string): string => {
          if (__isEnabled(allProps.value.noHighlight)) {
            return prismHighlight(Prism, str, lang);
          }
          return str;
        };

        const opts = {
          html: __isEnabled(allProps.value.noHtml),
          linkify: __isEnabled(allProps.value.noLinkify),
          typographer: __isEnabled(allProps.value.noTypographer),
          breaks: __isEnabled(allProps.value.noBreaks),
          highlight: highlight,
        };

        const md = markdownIt(opts);

        if (__isEnabled(allProps.value.noImage)) {
          md.use(imsize);
        }

        extendBlockQuote(md);
        extendHeading(
          md,
          tocData,
          allProps.value.toc,
          allProps.value.tocStart,
          allProps.value.tocEnd,
          allProps.value.noHeadingAnchorLinks,
        );
        extendImage(md);
        extendLink(md, {
          noopener: !allProps.value.noNoopener,
          noreferrer: !allProps.value.noNoreferrer,
        });
        extendTable(md);
        extendToken(md);

        if (__isEnabled(allProps.value.noContainer)) {
          extendContainers(md);
        }
        if (__isEnabled(allProps.value.noLineNumbers)) {
          extendFenceLineNumbers(md, allProps.value.lineNumberAlt);
        }

        // handle disabled rules
        const disabled = [];
        if (!__isEnabled(allProps.value.noImage)) {
          disabled.push("image");
        }
        if (!__isEnabled(allProps.value.noLink)) {
          disabled.push("link");
        }
        if (!__isEnabled(allProps.value.noBlockquote)) {
          disabled.push("blockquote");
        }
        if (disabled.length > 0) {
          md.disable(disabled);
        }

        if (allProps.value.plugins.length > 0) {
          allProps.value.plugins.forEach((plugin: unknown) => {
            if (typeof plugin === "function") {
              md.use(plugin as PluginSimple);
            } else {
              const pluginConfig = plugin as {
                plugin?: PluginWithOptions;
                options?: unknown;
              };
              if (typeof pluginConfig.plugin === "function" && pluginConfig.options) {
                md.use(pluginConfig.plugin, pluginConfig.options);
              }
            }
          });
        }

        rendered.value = md.render(markdown);

        if (allProps.value.toc && tocData.length > 0) {
          emit("data", tocData);
        }
      }

      const renderedMarkdown = h("div", {
        ref: markdownRef,
        class: ["q-markdown", allProps.value.contentClass],
        style: allProps.value.contentStyle,
        innerHTML: rendered.value,
      });

      const renderedCopyWrapper = h(
        "div",
        {
          style: {
            position: "relative",
          },
        },
        [renderedMarkdown, __renderCopy()],
      );

      return allProps.value.showCopy !== true ? renderedMarkdown : renderedCopyWrapper;
    }

    // expose public methods
    expose({
      makeTree,
    });

    return () => __renderMarkdown();
  },
});

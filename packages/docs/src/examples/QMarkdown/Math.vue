<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import texmath from 'markdown-it-texmath'
import 'markdown-it-texmath/css/texmath.css'

const markdown = `Euler's identity $e^{i\\pi}+1=0$ can be rendered inline.

Display math works too:

$$
\\varphi = \\frac{1 + \\sqrt{5}}{2}
$$

Macros can be forwarded to KaTeX, so $\\RR^2$ renders as a real-number vector space.`

defineOptions({ name: 'Math' })

const plugins = [
  {
    plugin: texmath,
    options: {
      engine: katex,
      delimiters: 'dollars',
      katexOptions: {
        macros: {
          '\\RR': '\\mathbb{R}',
        },
      },
    },
  },
]
</script>

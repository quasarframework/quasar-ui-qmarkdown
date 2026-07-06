<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable typographer" />
    <q-markdown :no-typographer="model" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const markdown = `Copyright and marks:
(c) (C) (r) (R) (tm) (TM)

Math:
+-

Ellipses and punctuation cleanup:
test.. test... test..... test?..... test!...
!!!!!! ???? ,,

Dashes:
word -- word
word --- word

Smartypants:
"double quotes", 'single quotes', and it's John's book.

Note: markdown-it 14 no longer replaces \`(p)\` or \`(P)\`. Use \`§\`, \`¶\`, or an HTML entity directly when you need those symbols.`

defineOptions({ name: 'Typography' })

const model = ref(false)
</script>

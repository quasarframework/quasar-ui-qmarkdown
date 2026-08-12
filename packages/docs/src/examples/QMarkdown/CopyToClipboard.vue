<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable highlighting" />
    <q-toggle v-model="noNotification" label="Disable copy notification" />
    <q-markdown
      :no-highlight="model"
      :no-notification="noNotification"
      no-line-numbers
      show-copy
      :src="markdown"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const markdown = `    Indented code

Inline \`code\`

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\`js
var foo = function (bar) {
return bar++;
};

console.log(foo(5));
\`\`\``

defineOptions({ name: 'CopyToClipboard' })

const model = ref(false)
const noNotification = ref(false)
</script>

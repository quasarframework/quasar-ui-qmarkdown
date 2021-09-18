<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins">
==This sentence is marked.==

This is ==marked== in the middle of a sentence.
    </q-markdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import mark from 'markdown-it-mark'

export default defineComponent({
  name: 'Mark',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [mark]

    return {
      plugins
    }
  }
})
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown :plugins="plugins">
==This sentence is marked.==

This is ==marked== in the middle of a sentence.
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
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
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown
      :plugins="plugins"
    >
      - 19^th^
      - H~2~O
    </q-markdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'

export default defineComponent({
  name: 'SubscriptSuperscript',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [ subscript, superscript ]

    return {
      plugins
    }
  }
})
</script>
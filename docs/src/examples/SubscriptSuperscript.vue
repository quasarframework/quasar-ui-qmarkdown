<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :plugins="plugins"
    >
- 19^th^
- H~2~O
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
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
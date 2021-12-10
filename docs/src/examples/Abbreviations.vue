<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown
      :plugins="plugins"
    >
      This is an HTML abbreviation example.

      It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

      *[HTML]: Hyper Text Markup Language
    </q-markdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import abbreviation from 'markdown-it-abbr'

export default defineComponent({
  name: 'Abbreviations',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [abbreviation]

    return {
      plugins
    }
  }
})
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown
      :plugins="plugins"
    >
++This sentence is inserted.++

This is ++inserted++ in the middle of a sentence.
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import insert from 'markdown-it-ins'

export default defineComponent({
  name: 'Insert',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [insert]

    return {
      plugins
    }
  }
})
</script>
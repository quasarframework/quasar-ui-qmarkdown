<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :plugins="plugins"
    >
++This sentence is inserted.++

This is ++inserted++ in the middle of a sentence.
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
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
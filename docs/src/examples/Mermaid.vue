<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :plugins="plugins"
    >
```mermaid Optional Title
graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[Car]
```
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

export default defineComponent({
  name: 'Mermaid',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [markdownItMermaid]

    return {
      plugins
    }
  }
})
</script>
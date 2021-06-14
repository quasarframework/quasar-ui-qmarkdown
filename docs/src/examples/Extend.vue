<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown
      :extend="onExtend"
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
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

export default defineComponent({
  name: 'Extend',
  components: {
    QMarkdown
  },

  setup () {
    function onExtend (mdi /* markdown-it instance */) {
      mdi.use(markdownItMermaid)
    }

    return {
      onExtend
    }
  }
})
</script>
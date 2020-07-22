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
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'

export default {
  methods: {
    onExtend (mdi /* markdown-it instance */) {
      mdi.use(markdownItMermaid)
    }
  }
}
</script>

<style lang="sass">
/* image container */
div.mermaid
  width: fit-content

/* image title */
.mermaid-title
  width: fit-content
  margin: auto
  font-weight: 900
  font-size: 2em
  color: grey
  padding-bottom: 0.5em

/* image itself */
.mermaid > svg
  margin: auto
  display: block
</style>

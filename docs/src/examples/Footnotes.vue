<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :plugins="plugins"
    >
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have `markup`**
  and multiple paragraphs.

[^second]: Footnote text.
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
import footnote from 'markdown-it-footnote'

export default defineComponent({
  name: 'Footnotes',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [footnote]

    return {
      plugins
    }
  }
})
</script>
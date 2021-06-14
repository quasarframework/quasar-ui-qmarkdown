<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable footnotes"></q-toggle>
    <q-markdown
      :no-footnote="model"
    >
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have `markup`**
  and multiple paragraphs.

[^second]: Footnote text.
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default defineComponent({
  name: 'Footnotes',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false)

    return {
      model
    }
  }
})
</script>
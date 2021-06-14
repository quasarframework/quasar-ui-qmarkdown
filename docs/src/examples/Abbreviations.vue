<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable abbreviations"></q-toggle>
    <q-markdown
      :no-abbreviation="model"
    >
This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default defineComponent({
  name: 'Abbreviations',
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
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable mark"></q-toggle>
    <q-markdown
      :no-mark="model"
    >
==This sentence is is marked.==

This is ==marked== in the middle of a sentence.
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Mark',
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
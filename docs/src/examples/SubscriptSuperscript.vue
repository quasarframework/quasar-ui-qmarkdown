<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable subscript"></q-toggle>
    <q-toggle v-model="model2" label="Disable superscript"></q-toggle>
    <q-markdown
      :no-subscript="model"
      :no-superscript="model2"
    >
- 19^th^
- H~2~O
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'SubscriptSuperscript',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false),
      model2 = ref(false)

    return {
      model,
      model2
    }
  }
})
</script>
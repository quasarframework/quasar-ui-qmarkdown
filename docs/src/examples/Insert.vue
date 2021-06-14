<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable insert"></q-toggle>
    <q-markdown
      :no-insert="model"
    >
++This sentence is is inserted.++

This is ++inserted++ in the middle of a sentence.
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default defineComponent({
  name: 'Insert',
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
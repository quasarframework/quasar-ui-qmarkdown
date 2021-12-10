<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable links"
    />
    <q-toggle
      v-model="model1"
      label="Disable linkify"
    />
    <q-markdown
      :no-link="model"
      :no-linkify="model1"
    >
      [External Link](https://github.com/quasarframework/quasar)

      [local link](/demo)

      [anchor link](#example-Containers)

      [link with title](https://github.com/quasarframework/quasar/ "title text!")

      Auto-converted link: https://github.com/quasarframework/quasar
    </q-markdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Links',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false),
      model1 = ref(false)

    return {
      model,
      model1
    }
  }
})
</script>
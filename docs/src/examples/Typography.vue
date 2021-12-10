<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable typographer"
    />
    <q-markdown
      :no-typographer="model"
    >
      (c) (C) (r) (R) (tm) (TM) (p) (P) +-

      test.. test... test..... test?..... test!...

      !!!!!! ???? ,,  -- ---

      Smartypants: "double quotes" and 'single quotes'
    </q-markdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Typography',
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
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable typographer"
    />
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :no-typographer="model"
    >
(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!...

!!!!!! ???? ,,  -- ---

Smartypants: "double quotes" and 'single quotes'
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

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
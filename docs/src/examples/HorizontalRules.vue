<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown>
___

---

***
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'HorizontalRules',
  components: {
    QMarkdown
  }
})
</script>
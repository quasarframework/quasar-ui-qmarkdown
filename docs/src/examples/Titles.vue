<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown>
Top-Level Title
===

Second-Level Title
---
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default defineComponent({
  name: 'Titles',
  components: {
    QMarkdown
  }
})
</script>
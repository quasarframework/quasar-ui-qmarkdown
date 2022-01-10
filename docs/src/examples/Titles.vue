<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown>
Titles become anchor links

Top-Level Title
===

Second-Level Title
---
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Titles',
  components: {
    QMarkdown
  }
})
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown>
      **This is bold text**

      __This is bold text, second way__

      *This is italic text*

      _This is italic text, second way_

      **_This is bold italic text_**

      ___This is bold italic text, second way___

      ~~This is Strikethrough~~
    </q-markdown>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Emphasis',
  components: {
    QMarkdown
  }
})
</script>
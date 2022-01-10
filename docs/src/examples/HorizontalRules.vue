<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown>
1st way

___

2nd way

---

3rd way

***



1st way (with text)
___

2nd way (with text, becomes an anchor link)
---

3rd way (with text)
***
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
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
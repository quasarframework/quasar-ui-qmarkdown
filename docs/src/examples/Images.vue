<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable images"></q-toggle>
    <q-toggle v-model="model2" label="Disable links"></q-toggle>
    <q-toggle v-model="model3" label="Disable linkify"></q-toggle>
    <q-markdown
      :no-image="model"
      :no-link="model2"
      :no-linkify="model3"
    >
Max fixed size image: 200x200; responsive
![Minion](https://octodex.github.com/images/minion.png =200x200)

Max fixed size image: 300x300; with title; responsive
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat" =300x300)

Responsive image - adjust browser to see auto-resize
![Minion](https://octodex.github.com/images/minion.png "Responsive Image")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location (see code for markdown):

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default defineComponent({
  name: 'Images',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false),
      model2 = ref(false),
      model3 = ref(false)

    return {
      model,
      model2,
      model3
    }
  }
})
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable images" />
    <q-toggle v-model="model2" label="Disable links" />
    <q-toggle v-model="model3" label="Disable linkify" />
    <q-markdown :no-image="model" :no-link="model2" :no-linkify="model3" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const markdown = `Max fixed size image: 200x200; responsive
![Minion](https://octodex.github.com/images/minion.png =200x200)

Max fixed size image: 300x300; with title; responsive
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat" =300x300)

Responsive image - adjust browser to see auto-resize
![Minion](https://octodex.github.com/images/minion.png "Responsive Image")

Like links, images can also use reference-style syntax. The image below gets its URL from the [id] definition in the source.

![Alt text][id]

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"`

defineOptions({ name: 'Images' })

const model = ref(false),
  model2 = ref(false),
  model3 = ref(false)
</script>

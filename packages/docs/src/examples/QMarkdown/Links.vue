<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable links" />
    <q-toggle v-model="model1" label="Disable linkify" />
    <q-markdown :no-link="model" :no-linkify="model1" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const markdown = `[External Link](https://github.com/quasarframework/quasar)

[local link](/demo)

[anchor link](#example-Containers)

[link with title](https://github.com/quasarframework/quasar/ "title text!")

Auto-converted link: https://github.com/quasarframework/quasar`

defineOptions({ name: 'Links' })

const model = ref(false),
  model1 = ref(false)
</script>

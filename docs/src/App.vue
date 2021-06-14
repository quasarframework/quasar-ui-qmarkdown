<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useMeta } from 'quasar'

import { provideMarkdownStore } from 'assets/markdown-store.js'
import getMeta from 'assets/get-meta.js'

export default defineComponent({
  name: 'App',

  setup () {
    useMeta({
      title: 'Qmarkdown » inline markdown in your Quasar apps',
      titleTemplate: title => `${ title } » QMarkdown`,

      meta: getMeta(
        'QMarkdown - inline markdown in your Quasar apps',
        'QMarkdown is a powerful transformer that allows inline markdown in your Quasar apps.'
      )
    })

    provideMarkdownStore()
  }
})
</script>

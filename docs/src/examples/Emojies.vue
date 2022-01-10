<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :plugins="plugins"
    >
Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import emoji from 'markdown-it-emoji'

export default defineComponent({
  name: 'Emojies',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [emoji]

    return {
      plugins
    }
  }
})
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown
      :plugins="plugins"
    >
      Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:

      Shortcuts (emoticons): :-) :-( 8-) ;)
    </q-markdown>
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
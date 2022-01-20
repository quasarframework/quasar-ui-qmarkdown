<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :plugins="plugins"
    >
Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

  Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
import deflist from 'markdown-it-deflist'

export default defineComponent({
  name: 'DefinitionLists',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [deflist]

    return {
      plugins
    }
  }
})
</script>
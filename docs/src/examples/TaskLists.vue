<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown
      :plugins="plugins"
    >
### Solar System Exploration, 1950s – 1960s

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'
import taskLists from 'markdown-it-task-lists'

export default defineComponent({
  name: 'TaskLists',
  components: {
    QMarkdown
  },

  setup () {
    const plugins = [taskLists]

    return {
      plugins
    }
  }
})
</script>
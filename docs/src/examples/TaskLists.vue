<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable tasklist"
    />
    <q-toggle
      v-model="taskListsEnable"
      label="Tasklist enable"
    />
    <q-toggle
      v-model="taskListsLabel"
      label="Tasklist label"
    />
    <q-toggle
      v-model="taskListsLabelAfter"
      label="Tasklist label after"
      :disable="!taskListsLabel"
    />
    <q-markdown
      :no-tasklist="model"
      :task-lists-enable="taskListsEnable"
      :task-lists-label="taskListsLabel"
      :task-lists-label-after="taskListsLabelAfter"
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

export default defineComponent({
  name: 'TaskLists',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false),
      taskListsEnable = ref(false),
      taskListsLabel = ref(false),
      taskListsLabelAfter = ref(false)

    watch(() => taskListsLabel, (val) => {
      if (!val) {
        taskListsLabelAfter.value = false
      }
    })

    return {
      model,
      taskListsEnable,
      taskListsLabel,
      taskListsLabelAfter
    }
  }
})
</script>
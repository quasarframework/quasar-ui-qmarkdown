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
export default {
  data () {
    return {
      model: false,
      taskListsEnable: false,
      taskListsLabel: false,
      taskListsLabelAfter: false
    }
  },
  watch: {
    taskListsLabel (val) {
      if (!val) {
        this.taskListsLabelAfter = false
      }
    }
  }
}
</script>

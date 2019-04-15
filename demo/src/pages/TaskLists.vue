<template>
  <div class="q-pa-md q-gutter-sm">
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
    <show-markdown
      label="Task Lists"
      :taskListsEnable="taskListsEnable"
      :taskListsLabel="taskListsLabel"
      :taskListsLabelAfter="taskListsLabelAfter"
    >
      <template v-slot:markdown>
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
      </template>
      <template v-slot:input>
### Solar System Exploration, 1950s – 1960s

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley      </template>
    </show-markdown>
  </div>
</template>

<script>
import ShowMarkdown from '../components/ShowMarkdown'

export default {
  components: {
    ShowMarkdown
  },

  data () {
    return {
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

<style>
.task-list-item label {
  color: blue;
}
.task-list-item-label {
  color: red !important;
}
</style>

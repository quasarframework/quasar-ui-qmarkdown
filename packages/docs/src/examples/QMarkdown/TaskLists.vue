<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import taskLists from "markdown-it-task-lists";

const markdown = `### Solar System Exploration, 1950s – 1960s

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley`;

export default defineComponent({
  name: "TaskLists",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [taskLists];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

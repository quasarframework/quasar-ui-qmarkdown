<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import insert from "markdown-it-ins";

const markdown = `++This sentence is inserted.++

This is ++inserted++ in the middle of a sentence.`;

export default defineComponent({
  name: "Insert",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [insert];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

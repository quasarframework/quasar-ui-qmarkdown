<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";

const markdown = `- 19^th^
- H~2~O`;

export default defineComponent({
  name: "SubscriptSuperscript",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [subscript, superscript];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

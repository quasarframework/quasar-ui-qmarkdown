<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :src="markdown" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `Titles become anchor links

Top-Level Title
===

Second-Level Title
---`;

export default defineComponent({
  name: "Titles",
  components: {
    QMarkdown,
  },

  setup() {
    return {
      markdown,
    };
  },
});
</script>

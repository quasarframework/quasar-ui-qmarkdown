<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import markdownItMermaid from "@datatraccorporation/markdown-it-mermaid";

const markdown = `\`\`\`mermaid Optional Title
graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[Car]
\`\`\``;

export default defineComponent({
  name: "Mermaid",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [markdownItMermaid];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

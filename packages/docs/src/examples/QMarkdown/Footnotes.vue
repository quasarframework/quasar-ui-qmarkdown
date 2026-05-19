<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import footnote from "markdown-it-footnote";

const markdown = `Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have \`markup\`**
  and multiple paragraphs.

[^second]: Footnote text.`;

export default defineComponent({
  name: "Footnotes",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [footnote];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

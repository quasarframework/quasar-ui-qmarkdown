<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import deflist from "markdown-it-deflist";

const markdown = `Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

  Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b`;

export default defineComponent({
  name: "DefinitionLists",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [deflist];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

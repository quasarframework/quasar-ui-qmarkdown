<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import emoji from "markdown-it-emoji";

const markdown = `Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)`;

export default defineComponent({
  name: "Emojies",
  components: {
    QMarkdown,
  },

  setup() {
    const plugins = [emoji];

    return {
      markdown,
      plugins,
    };
  },
});
</script>

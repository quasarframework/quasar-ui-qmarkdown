<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable blockquote" />
    <q-markdown :no-blockquote="model" :src="markdown" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `> This is a Blockquote
> with a \`token\` and a [link](https://quasar.dev)

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.`;

export default defineComponent({
  name: "Blockquotes",
  components: {
    QMarkdown,
  },

  setup() {
    const model = ref(false);

    return {
      markdown,
      model,
    };
  },
});
</script>

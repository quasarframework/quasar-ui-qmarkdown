<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable blockquote" />
    <q-markdown :no-blockquote="model" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `> This is a Blockquote
> with a \`token\` and a [link](https://quasar.dev)

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.`;

defineOptions({ name: "Blockquotes" });

const model = ref(false);
</script>

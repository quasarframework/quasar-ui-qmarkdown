<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";
import mark from "markdown-it-mark";

const markdown = `==This sentence is marked.==

This is ==marked== in the middle of a sentence.`;

defineOptions({ name: "QMarkdownMarkExample" });

const plugins = [mark];
</script>

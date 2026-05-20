<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `**This is bold text**

__This is bold text, second way__

*This is italic text*

_This is italic text, second way_

**_This is bold italic text_**

___This is bold italic text, second way___

~~This is Strikethrough~~`;

defineOptions({ name: "Emphasis" });
</script>

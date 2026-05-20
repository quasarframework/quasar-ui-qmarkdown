<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `Titles become anchor links

Top-Level Title
===

Second-Level Title
---`;

defineOptions({ name: "Titles" });
</script>

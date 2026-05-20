<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable typographer" />
    <q-markdown :no-typographer="model" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!...

!!!!!! ???? ,,  -- ---

Smartypants: "double quotes" and 'single quotes'`;

defineOptions({ name: "Typography" });

const model = ref(false);
</script>

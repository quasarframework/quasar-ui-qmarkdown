<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable container" />
    <q-toggle v-model="model2" label="Disable links" />
    <q-markdown :no-container="model" :no-link="model2" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `:::
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: info
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: info With Custom Title
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: tip
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: warning
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: danger
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
:::

::: danger Embedable
here be **dragons**
with a \`token\` and a [link](https://quasar.dev)
  ::: warning
  here be **dragons**
  with a \`token\` and a [link](https://quasar.dev)
::::::`;

defineOptions({ name: "Containers" });

const model = ref(false),
  model2 = ref(false);
</script>

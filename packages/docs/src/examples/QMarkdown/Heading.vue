<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable Heading Anchor Links (hover to see difference)" />
    <div class="q-ma-md q-gutter-sm">
      <div>
        The TOC (Table of Contents) Start and End properties also control the Heading anchor links
      </div>
      <div>TOC Start: {{ range.min }}</div>
      <div>TOC End: {{ range.max }}</div>
    </div>
    <q-range v-model="range" :min="1" :max="6" label-always />
    <q-markdown
      :no-heading-anchor-links="model"
      :toc-start="range.min"
      :toc-end="range.max"
      toc
      @data="onToc"
      :src="markdown"
    />
    <q-separator />
    <p>Output:</p>
    <pre>{{ JSON.stringify(results, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading`;

defineOptions({ name: "Heading" });

const model = ref(false);
const range = ref({
  min: 1,
  max: 3,
});
const results = ref<unknown>({});

function onToc(data: unknown) {
  results.value = data;
}
</script>

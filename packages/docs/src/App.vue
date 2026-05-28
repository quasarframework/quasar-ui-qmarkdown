<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMeta } from "quasar";
import { useDark } from "@/.q-press/composables/dark";

import getMeta from "@/.q-press/assets/get-meta";

const { initDark } = useDark();
initDark();

useMeta({
  title: "QMarkdown for Vue and Quasar",
  titleTemplate: (title) => `${title} | QMarkdown`,

  meta: getMeta(
    "QMarkdown - Inline Markdown for Vue and Quasar",
    "QMarkdown is a Vue and Quasar component for rendering inline markdown with markdown-it, Prism highlighting, and Quasar-friendly styling.",
  ),
});
</script>

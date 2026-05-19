import { defineBoot } from "@quasar/app-vite";
import type { Component } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";

export default defineBoot(({ app }) => {
  app.component("QMarkdown", QMarkdown as Component);
});

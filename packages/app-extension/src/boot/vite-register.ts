import { defineBoot } from "#q-app";
import VuePlugin from "@quasar/quasar-ui-qmarkdown";

export default defineBoot(({ app }) => {
  app.use(VuePlugin);
});

import { defineBoot } from '@quasar/app-webpack/wrappers';
import VuePlugin from '@quasar/quasar-ui-qmarkdown/src/index.js';

export default defineBoot(({ app }) => {
  app.use(VuePlugin);
});

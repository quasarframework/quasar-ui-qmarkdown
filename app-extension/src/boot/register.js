import { defineBoot } from '#q-app/wrappers'
import VuePlugin from '@quasar/quasar-ui-qmarkdown/src/index.js'

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})

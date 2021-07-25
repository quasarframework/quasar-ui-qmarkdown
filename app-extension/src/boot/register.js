import { boot } from 'quasar/wrappers'
import VuePlugin from '@quasar/quasar-ui-qmarkdown/src/index.js'

export default boot(({ app }) => {
  app.use(VuePlugin)
})

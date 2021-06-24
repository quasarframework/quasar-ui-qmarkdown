import { boot } from 'quasar/wrappers'
import VuePlugin from '@quasar/quasar-ui-qmarkdown/src/index.js'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

export default boot(({ app }) => {
  app.use(VuePlugin)
})

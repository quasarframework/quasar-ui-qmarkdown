import VuePlugin from 'ui' // "ui" is aliased in quasar.conf.js

import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(VuePlugin)
})

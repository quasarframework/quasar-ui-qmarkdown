/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendQuasarConf = function (api, conf) {
  // make sure qmarkdown boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qmarkdown/src/boot/qmarkdown.js')
  console.log(` App Extension (qmarkdown) Info: 'Adding qmarkdown boot reference to your quasar.conf.js'`)

  // make sure boot & component files transpile
  conf.build.transpileDependencies.push(/quasar-app-extension-qmarkdown[\\/]src/)

  // make sure qmarkdown css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qmarkdown/src/component/markdown.styl')
  console.log(` App Extension (qmarkdown) Info: 'Adding markdown.styl css reference to your quasar.conf.js'`)
}

module.exports = function (api, ctx) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0-beta.18')

  // register JSON api
  api.registerDescribeApi('QMarkdown', './component/QMarkdown.json')

  // extend quasar.conf
  api.extendQuasarConf((conf) => {
    extendQuasarConf(api, conf)
  })
}

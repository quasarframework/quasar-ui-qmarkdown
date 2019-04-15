/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendQuasarConf = function (api, conf) {
  // for brevity
  let boot = conf.boot

  // make sure qmarkdown boot file is registered
  const bootFile = '~@quasar/quasar-app-extension-qmarkdown/src/boot/qmarkdown.js'
  if (!boot.includes(bootFile)) {
    boot.push(bootFile)
    console.log(` App Extension (qmarkdown) Info: 'Adding qmarkdown boot reference to your quasar.conf.js'`)
  }

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-qmarkdown[\\/]src/)

  // // for brevity
  let css = conf.css

  // make sure qmarkdown css goes through webpack to avoid ssr issues
  const cssFile = '~@quasar/quasar-app-extension-qmarkdown/src/component/markdown.styl'
  if (!css.includes(cssFile)) {
    css.push(cssFile)
    console.log(` App Extension (qmarkdown) Info: 'Adding markdown.styl css reference to your quasar.conf.js'`)
  }
}

module.exports = function (api, ctx) {
  // register JSON api
  api.registerDescribeApi('QMarkdown', './component/QMarkdown.json')

  // extend quasar.conf
  api.extendQuasarConf((conf) => {
    extendQuasarConf(api, conf)
  })
}

/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendConf = function (api, conf) {
  // make sure there is a boot array
  if (!conf.boot) {
    conf.boot = []
  }

  // for brevity
  let boot = conf.boot

  // make sure qmarkdown boot file is registered
  if (!boot.includes('~@quasar/quasar-app-extension-qmarkdown/src/boot/qmarkdown.js')) {
    boot.push('~@quasar/quasar-app-extension-qmarkdown/src/boot/qmarkdown.js')
    // make sure boot file transpiles
    conf.build.transpileDependencies.push(/quasar-app-extension-qmarkdown[\\/]src[\\/]boot/)
    console.log(` App Extension (qmarkdown) Info: 'Adding qmarkdown boot reference to your quasar.conf.js'`)
  }

  // // make sure there is a framework object
  // if (!conf.framework) {
  //   conf.framework = {}
  // }

  // // make sure there is a components array
  // if (!conf.framework.components) {
  //   conf.framework.components = []
  // }

  // // for brevity
  // let components = conf.framework.components

  // // make sure there is QMarkupTable
  // if (!components.includes('QMarkupTable')) {
  //   // add it
  //   components.push('QMarkupTable')
  // }

  // // make sure there is a css array
  if (!conf.css) {
    conf.css = []
  }

  // // for brevity
  let css = conf.css

  // make sure qmarkdown css goes through webpack to avoid ssr issues
  if (!css.includes('~@quasar/quasar-app-extension-qmarkdown/src/component/markdown.styl')) {
    css.push('~@quasar/quasar-app-extension-qmarkdown/src/component/markdown.styl')
    console.log(` App Extension (qmarkdown) Info: 'Adding markdown.styl css reference to your quasar.conf.js'`)
  }
}

module.exports = function (api, ctx) {
  // register JSON api
  // api.registerDescribeApi('QMarkdown', './component/QMarkdown.json')

  // extend quasar.conf
  api.extendQuasarConf((conf) => {
    extendConf(api, conf)
  })

  // api.chainWebpack((chain, invokeParams) => {
  //   // console.log('chain:', chain)
  //   // console.log('invokeParams:', invokeParams)
  // })

  // api.extendWebpack((webpackConfig, invokeParams) => {
  //   console.log('webpackConfig:', webpackConfig)
  //   console.log('invokeParams:', invokeParams)
  // })
}

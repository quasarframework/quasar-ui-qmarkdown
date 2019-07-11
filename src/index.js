/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
const renderMarkdown = require('./markdown')

const extendQuasarConf = function (conf) {
  // make sure qmarkdown boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qmarkdown/src/boot/qmarkdown.js')
  console.log(` App Extension (qmarkdown) Info: 'Adding qmarkdown boot reference to your quasar.conf.js'`)

  // make sure boot & component files transpile
  conf.build.transpileDependencies.push(/quasar-app-extension-qmarkdown[\\/]src/)

  // make sure qmarkdown css goes through webpack to avoid ssr issues
  conf.css.push('~@quasar/quasar-app-extension-qmarkdown/src/component/markdown.styl')
  console.log(` App Extension (qmarkdown) Info: 'Adding markdown.styl css reference to your quasar.conf.js'`)
}

const chainWebpack = function (ctx, chain, { isClient }) {
  console.log(` App Extension (qmarkdown) Info: 'Adding markdown loader to chainWebpack in your quasar.conf.js'`)
  chain.module.rule('md')
    .test(/\.md$/i)
    .use('raw-loader')
    .loader('raw-loader')

  console.log(` App Extension (qmarkdown) Info: 'Adding .vmd (vue+markdown) loader to chainWebpack in your quasar.conf.js'`)
  const rule = chain.module.rule('vmd')
    .test(/\.vmd$/)
    .pre()

  rule.use('v-loader')
    .loader('vue-loader')
    .options({
      productionMode: ctx.prod,
      compilerOptions: {
        preserveWhitespace: false
      },
      transformAssetUrls: {
        video: 'src',
        source: 'src',
        img: 'src',
        image: 'xlink:href'
      }
    })

  rule.use('ware-loader')
    .loader('ware-loader')
    .options({
      raw: true,
      middleware: function (source) {
        let rendered = renderMarkdown(source)
        return `${rendered}`
      }
    })
}

module.exports = function (api) {
  // quasar compatibility check
  api.compatibleWith('@quasar/app', '^1.0.0')

  // register JSON api
  api.registerDescribeApi('QMarkdown', './component/QMarkdown.json')

  // extend quasar.conf
  api.extendQuasarConf(extendQuasarConf)

  // chain webpack
  api.chainWebpack((chain, { isClient }) => chainWebpack(api.ctx, chain, isClient))
}

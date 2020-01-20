/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const renderMarkdown = require('./markdown')

function extendConf (conf) {
  // register our boot file
  conf.boot.push('~@quasar/quasar-app-extension-qmarkdown/src/boot/register.js')

  // make sure app extension files & ui packages get transpiled
  conf.build.transpileDependencies.push(/quasar-app-extension-qmarkdown[\\/]src/)
  conf.build.transpileDependencies.push(/quasar-ui-qmarkdown[\\/]src/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~@quasar/quasar-ui-qmarkdown/src/index.sass')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^1.5.0')
  api.compatibleWith('@quasar/app', '^1.1.0')

  // Uncomment the line below if you provide a JSON API for your component
  api.registerDescribeApi('QMarkdown', '~@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)

  // chain webpack
  api.chainWebpack((chain) => chainWebpack(api, chain))
}

const chainWebpack = function (api, chain) {

  if (api.prompts.import_md !== void 0 && api.prompts.import_md === true) {
    console.log(` App Extension (qmarkdown) Info: 'Adding markdown loader to chainWebpack'`)
    chain.module.rule('md')
      .test(/\.md$/i)
      .use('raw-loader')
      .loader('raw-loader')
  }

  if (api.prompts.import_vmd !== void 0 && api.prompts.import_vmd === true) {
    console.log(` App Extension (qmarkdown) Info: 'Adding .vmd (vue+markdown) loader to chainWebpack'`)
    const rule = chain.module.rule('vmd')
      .test(/\.vmd$/)
      .pre()

    rule.use('v-loader')
      .loader('vue-loader')
      .options({
        productionMode: api.prod,
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
}

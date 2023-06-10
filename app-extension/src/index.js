/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const { merge } = require('webpack-merge')

function extendConf (conf, api) {
  // register our boot file
  conf.boot.push('~@quasar/quasar-app-extension-qmarkdown/src/boot/register.js')

  if (api.hasVite !== true) {
    // make sure app extension files & ui packages get transpiled
    conf.build.transpileDependencies.push(/quasar-app-extension-qmarkdown[\\/]src/)
    conf.build.transpileDependencies.push(/quasar-ui-qmarkdown[\\/]src/)
  }

  // make sure these plugins are in the build
  conf.framework.plugins.push('Notify')
  conf.framework.plugins.push('Dark')

  let compilerOptions = null

  // make sure to have 'compilerOptions.isPreTag' available
  if (api.hasVite === true) {
    conf.build = merge({
      viteVuePluginOptions: {
        template: {
          compilerOptions: {
            isPreTag: (tag) => tag === 'pre'
          }
        }
      }
    }, conf.build)
    compilerOptions = conf.build.viteVuePluginOptions.template.compilerOptions
  }
  else {
    conf.build = merge({
      vueLoaderOptions: {
        compilerOptions: {
          isPreTag: (tag) => tag === 'pre'
        }
      }
    }, conf.build)
    compilerOptions = conf.build.vueLoaderOptions.compilerOptions
  }

  // This needs to be set for Vue 3
  const oldPreTagFunc = compilerOptions.isPreTag
  compilerOptions.isPreTag = (tag) => tag === 'pre' || tag === 'q-markdown' || tag === 'QMarkdown' || (typeof oldPreTagFunc === 'function' ? oldPreTagFunc(tag) : false)


  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~@quasar/quasar-ui-qmarkdown/src/index.sass')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite === true) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0 || ^2.0.0 || ^2.0.0-alpha.1')
  }
  else {
    api.compatibleWith('@quasar/app-webpack', '^3.0.0 || ^4.0.0 || ^4.0.0-alpha.1')
  }

  // Uncomment the line below if you provide a JSON API for your component
  api.registerDescribeApi('QMarkdown', '~@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)

  if (api.prompts.import_md !== undefined && api.prompts.import_md === true) {
    if (api.hasWebpack === true) {
      // chain webpack
      api.chainWebpack((chain, { isClient, isServer }, api) => {
        console.log(' App Extension (qmarkdown) Info: \'Adding markdown loader (*.md) to chainWebpack\'')
        chain.module.rule('md')
          .test(/\.md$/i)
          .use('raw-loader')
          .loader('raw-loader')
      })
    }
    if (api.hasVite === true) {
      api.extendViteConf((viteConf, { isClient, isServer }, api) => {
        console.log(' App Extension (qmarkdown) Info: \'Adding markdown loader (*.md) to extendViteConf\'')
        viteConf.plugins.push(
          viteRawImporter({
            fileRegex: /\.md$/
          })
        )
      })
    }
  }
}

function viteRawImporter (options) {
  return {
    name: 'vite-raw-importer',
    transform (code, id) {
      if (options.fileRegex && options.fileRegex.test(id)) {
        const json = JSON.stringify(code)
          .replace(/\u2028/g, '\\u2028')
          .replace(/\u2029/g, '\\u2029')

        return {
          code: `export default ${ json }`
        }
      }
    }
  }
}

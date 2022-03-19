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
   conf.framework.plugins.push('Dialog')
 
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
   compilerOptions.isPreTag = (tag) => tag === 'pre' || tag === 'q-markdown' || (typeof oldPreTagFunc === 'function' ? oldPreTagFunc(tag) : false)
 
 
   // make sure the stylesheet goes through webpack to avoid SSR issues
   conf.css.push('~@quasar/quasar-ui-qmarkdown/src/index.sass')
 }
 
module.exports = function (api) {
   // Quasar compatibility check; you may need
   // hard dependencies, as in a minimum version of the "quasar"
   // package or a minimum version of "@quasar/app" CLI
   api.compatibleWith('quasar', '^2.0.0')
 
   if (api.hasVite === true) {
     api.compatibleWith('@quasar/app-vite', '^1.0.0-alpha.0')
   }
   else {
     // should be "@quasar/app-webpack" but that is not backward compatible
     api.compatibleWith('@quasar/app', '^3.0.0')
   }
 
   // Uncomment the line below if you provide a JSON API for your component
   api.registerDescribeApi('QMarkdown', '~@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json')
 
   // We extend /quasar.conf.js
   api.extendQuasarConf(extendConf)
 }
 
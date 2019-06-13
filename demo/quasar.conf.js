// Configuration for your app
// const path = require('path')
const markdownIt = require('markdown-it')
const Prism = require('prismjs')
const container = require('markdown-it-container')
const emoji = require('markdown-it-emoji')
const subscript = require('markdown-it-sub')
const superscript = require('markdown-it-sup')
const footnote = require('markdown-it-footnote')
const deflist = require('markdown-it-deflist')
const abbreviation = require('markdown-it-abbr')
const insert = require('markdown-it-ins')
const mark = require('markdown-it-mark')
const taskLists = require('markdown-it-task-lists')
const imsize = require('markdown-it-imsize')

function slugify (str) {
  return encodeURIComponent(String(str).trim().replace(/\s+/g, '-'))
}

function highlight (str, lang) {
  if (lang === '') {
    lang = 'js'
  } else if (lang === 'vue' || lang === 'html') {
    lang = 'html'
  }

  if (Prism.languages[lang] !== void 0) {
    const code = Prism.highlight(str, Prism.languages[lang], lang)

    return `<pre class="q-markdown--code">` +
      `<code class="q-markdown--code__inner language-${lang}">${code}</code>` +
      `</pre>`
  }

  return ''
}

function extendToken (md) {
  const defaultRender = md.renderer.rules.code_inline

  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--token')
    return defaultRender(tokens, idx, options, env, self)
  }
}

function extendTable (md) {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--table')

    return self.renderToken(tokens, idx, options)
  }
}

function extendLink (md) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    const hrefIndex = token.attrIndex('href')
    if (token.attrs[hrefIndex][1][0] === '/') {
      token.attrSet('class', 'q-markdown--link q-markdown--link-local')
    } else {
      token.attrSet('class', 'q-markdown--link q-markdown--link-external')
      token.attrSet('target', '_blank')
    }

    return self.renderToken(tokens, idx, options)
  }
}

function extendImage (md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--image')
    return self.renderToken(tokens, idx, options)
  }
}

function extendHeading (md, tocData = [], toc = false, tocStart = 1, tocEnd = 3) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    const label = tokens[idx + 1]
      .children
      .reduce((acc, t) => acc + t.content, '')

    let classes = `q-markdown--heading-${token.tag}`

    if (token.markup === '=') {
      classes += ' q-markdown--title-heavy'
    } else if (token.markup === '-') {
      classes += ' q-markdown--title-light'
    }

    const id = slugify(label)
    token.attrSet('id', id)
    token.attrSet('class', classes)

    if (toc) {
      const tokenNumber = parseInt(token.tag[1])

      if (tocStart && tocEnd && tocStart < tocEnd && tokenNumber >= tocStart && tokenNumber <= tocEnd) {
        tocData.push({ id: id, label: label, level: tokenNumber, children: [] })
      }
    }

    return self.renderToken(tokens, idx, options)
  }
}

function createContainer (className, defaultTitle) {
  return [
    container,
    className,
    {
      render (tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(className.length).trim()
        if (token.nesting === 1) {
          return `<div class="q-markdown--note q-markdown--note--${className}"><p class="q-markdown--note-title">${info || defaultTitle}</p>\n`
        } else {
          return `</div>\n`
        }
      }
    }
  ]
}

function extendContainers (md) {
  md
    .use(...createContainer('info', 'INFO'))
    .use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'IMPORTANT'))
    .use(...createContainer('', ''))

    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })
}

function extendBlockQuote (md) {
  md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--note')
    return self.renderToken(tokens, idx, options)
  }
}

const opts = {
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight
}

const md = markdownIt(opts)
md.use(subscript)
md.use(superscript)
md.use(footnote)
md.use(deflist)
md.use(abbreviation)
md.use(insert)
md.use(mark)
md.use(emoji)
md.use(imsize)
md.use(taskLists, { enabled: true, label: true, labelAfter: true })

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5'
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QCard',
        'QCardSection',
        'QSeparator',
        'QTabs',
        'QTab',
        'QSplitter',
        'QEditor',
        'QExpansionItem',
        'QAvatar',
        'QToggle',
        'QMenu',
        'QScrollArea',
        'QTooltip'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      publicPath: 'app-extension-qmarkdown',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      },

      chainWebpack (chain, { isClient }) {
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
              let tocData = []
              extendHeading(md, tocData, true)
              extendBlockQuote(md)
              extendImage(md)
              extendLink(md)
              extendTable(md)
              extendToken(md)
              extendContainers(md)

              let rendered = md.render(source)
              rendered = String(rendered).replace('tocData: []', `tocData: ${JSON.stringify(tocData)}`)

              return `${rendered}`
            }
          })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      watchOptions: {
        ignored: [
          'node_modules',
          '!node_modules/@quasar/quasar-app-extension-qmarkdown'
        ]
      }
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}

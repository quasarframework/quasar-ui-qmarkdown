import container from 'markdown-it-container'

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

export default function extendContainers (md) {
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

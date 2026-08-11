// import container from 'markdown-it-container'
import container from './markdownitContainer'

function createContainer(md: any, className: string, defaultTitle: string): any[] {
  return [
    container,
    className,
    {
      render(tokens: any[], idx: number) {
        const token = tokens[idx]
        const info = md.utils.escapeHtml(token.info.trim().slice(className.length).trim())
        if (token.nesting === 1) {
          return `<div class="q-markdown--note q-markdown--note--${className}"><p class="q-markdown--note-title">${info || defaultTitle}</p>\n`
        } else {
          return '</div>\n'
        }
      },
    },
  ]
}

export default function extendContainers(md: any): void {
  md.use(...createContainer(md, 'info', 'INFO'))
  md.use(...createContainer(md, 'tip', 'TIP'))
  md.use(...createContainer(md, 'warning', 'WARNING'))
  md.use(...createContainer(md, 'danger', 'IMPORTANT'))
  md.use(...createContainer(md, '', ''))

  // explicitly escape Vue syntax
  md.use(container, 'v-pre', {
    render: (tokens: any[], idx: number) =>
      tokens[idx].nesting === 1 ? '<div v-pre>\n' : '</div>\n',
  })
}

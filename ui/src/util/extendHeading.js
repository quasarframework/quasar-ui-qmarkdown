import slugify from './slugify'

export default function extendHeading (md, tocData = [], toc = false, tocStart = 1, tocEnd = 3) {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    const label = tokens[idx + 1]
      .children
      .reduce((acc, t) => acc + t.content, '')

    let classes = `q-markdown--heading-${token.tag}`

    if (token.markup === '=') {
      classes += ' q-markdown--title-heavy'
    }
    else if (token.markup === '-') {
      classes += ' q-markdown--title-light'
    }

    const id = slugify(label)
    token.attrSet('id', id)
    token.attrSet('name', id)
    token.attrSet('class', classes)

    if (toc) {
      const tokenNumber = parseInt(token.tag[1])

      if (tocStart && tocEnd && tocStart <= tocEnd && tokenNumber >= tocStart && tokenNumber <= tocEnd) {
        tocData.push({ id: id, label: label, level: tokenNumber, children: [] })
      }
    }

    return self.renderToken(tokens, idx, options)
  }
}

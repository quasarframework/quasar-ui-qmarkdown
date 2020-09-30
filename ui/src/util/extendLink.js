import slugify from './slugify'

export default function extendLink (md) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    const hrefIndex = token.attrIndex('href')

    if (token.attrs[hrefIndex][1][0] === '#') {
      if (typeof location !== 'undefined') {
        token.attrs[hrefIndex][1] = location.pathname + token.attrs[hrefIndex][1]
      }
    }

    if (token.attrs[hrefIndex][1] === '') {
      token.attrSet('class', 'q-markdown--link q-markdown--link-local')
      if (tokens[idx + 1] && tokens[idx + 1].type === 'text' && tokens[idx + 1].content) {
        token.attrSet('id', slugify(tokens[idx + 1].content))
      }
    }
    else if (token.attrs[hrefIndex][1][0] === '/' ||
      token.attrs[hrefIndex][1].startsWith('..')) {
      token.attrSet('class', 'q-markdown--link q-markdown--link-local')
    }
    else {
      token.attrSet('class', 'q-markdown--link q-markdown--link-external')
      token.attrSet('target', '_blank')
    }

    return self.renderToken(tokens, idx, options)
  }
}

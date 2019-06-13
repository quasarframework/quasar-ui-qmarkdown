export default function extendLink (md) {
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

export default function extendImage (md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--image')

    // handle "alt" attribute, since markdown-it-imsize doesn't handle it properly
    // https://github.com/tatsy/markdown-it-imsize/blob/master/lib/index.js#L192
    if (Array.isArray(token.children) && token.children.length > 0 && token.children[0].type === 'text') {
      token.attrSet('alt', token.children[0].content)
    }

    return self.renderToken(tokens, idx, options)
  }
}

export default function extendImage(md: any, { disabled = false } = {}): void {
  md.renderer.rules.image = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const token = tokens[idx]

    const altText =
      Array.isArray(token.children) && token.children.length > 0
        ? token.children.map((child: any) => child.content).join('')
        : token.content || token.attrGet('alt') || ''

    if (disabled === true) {
      return md.utils.escapeHtml(altText)
    }

    token.attrSet('class', 'q-markdown--image')

    // handle "alt" attribute, since markdown-it-imsize doesn't handle it properly
    // https://github.com/tatsy/markdown-it-imsize/blob/master/lib/index.js#L192
    if (altText.length > 0) {
      token.attrSet('alt', altText)
    }

    return self.renderToken(tokens, idx, options)
  }
}

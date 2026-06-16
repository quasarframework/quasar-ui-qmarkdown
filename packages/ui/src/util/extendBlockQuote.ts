export default function extendBlockQuote(md: any): void {
  md.renderer.rules.blockquote_open = (
    tokens: any[],
    idx: number,
    options: any,
    env: any,
    self: any,
  ) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--note')
    return self.renderToken(tokens, idx, options)
  }
}

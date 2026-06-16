export default function extendToken(md: any): void {
  const defaultRender = md.renderer.rules.code_inline

  md.renderer.rules.code_inline = (
    tokens: any[],
    idx: number,
    options: any,
    env: any,
    self: any,
  ) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--token')
    return defaultRender(tokens, idx, options, env, self)
  }
}

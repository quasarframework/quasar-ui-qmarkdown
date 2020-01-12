export default function extendToken (md) {
  const defaultRender = md.renderer.rules.code_inline

  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--token')
    return defaultRender(tokens, idx, options, env, self)
  }
}

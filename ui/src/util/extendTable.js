export default function extendTable (md) {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--table')

    return self.renderToken(tokens, idx, options)
  }
}

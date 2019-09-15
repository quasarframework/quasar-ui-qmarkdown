export default function extendFenceLineNumbers (md) {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    const code = rawCode.slice(
      rawCode.indexOf('<code>') + 6,
      rawCode.indexOf('</code>')
    )

    const lines = code.split('\n')
    if (lines.length < 3) {
      return rawCode
    }

    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((line, index) => `<span class="q-markup--line-number">${index + 1}</span><br>`).join('')

    const lineNumbersWrapperCode =
      `<div class="q-markdown--line-numbers">${lineNumbersCode}</div><div class="q-markdown--code-wrapper">${rawCode}</div>`

    const finalCode =
      `<div class="q-markdown--line-numbers-wrapper">${lineNumbersWrapperCode}</div>`

    return finalCode
  }
}

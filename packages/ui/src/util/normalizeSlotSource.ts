export default function normalizeSlotSource(source: string): string {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')

  while (lines.length > 0 && lines[0]?.trim().length === 0) {
    lines.shift()
  }

  while (lines.length > 0 && lines[lines.length - 1]?.trim().length === 0) {
    lines.pop()
  }

  if (lines.length === 0) {
    return ''
  }

  const indentedLines = lines.filter((line: string) => line.trim().length > 0)
  let commonIndent = indentedLines[0]?.match(/^[\t ]*/)?.[0] || ''

  for (const line of indentedLines.slice(1)) {
    const indent = line.match(/^[\t ]*/)?.[0] || ''

    while (commonIndent.length > 0 && indent.startsWith(commonIndent) === false) {
      commonIndent = commonIndent.slice(0, -1)
    }
  }

  if (commonIndent.length === 0) {
    return lines.join('\n')
  }

  return lines
    .map((line) => (line.startsWith(commonIndent) ? line.slice(commonIndent.length) : line))
    .join('\n')
}

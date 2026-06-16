export interface QMarkdownTagParts {
  script?: string
  style?: string
  template?: string
}

const getTemplate = (html?: string): string => {
  let content = ''
  if (html && html.length > 0) {
    const start = '<template',
      end = '</template>'
    // find the first occurrence of "<template"
    const startIndex = html.indexOf(start)
    // find the last occurrence of "</template>"
    const lastIndex = html.lastIndexOf(end)
    if (startIndex > -1 && lastIndex > -1) {
      // grab the text
      content = html.substring(startIndex, lastIndex + end.length)
    }
  }
  return content
}

export default function getTagParts(html = ''): QMarkdownTagParts {
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
  if (canUseDOM !== true) {
    return {}
  }

  const results: QMarkdownTagParts = {}
  let tag

  // we'll use document to separate out of the sections,
  // but we can't use it for the <template> tags. Not only
  // does it reformat the html, it also removed any dynamic
  // vue properties.
  const t = getTemplate(html)

  if (t && t.length > 0) {
    results.template = t
  }
  const el = document.createElement('html')
  el.innerHTML = html
  tag = el.getElementsByTagName('script')
  const script = tag[0]
  if (script !== undefined) {
    results.script = script.outerHTML
  }
  tag = el.getElementsByTagName('style')
  const style = tag[0]
  if (style !== undefined) {
    results.style = style.outerHTML
  }
  return results
}

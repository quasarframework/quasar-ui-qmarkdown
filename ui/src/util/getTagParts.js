// 'use strict'

const getTemplate = (html) => {
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

export default function (html) {
  const canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  )
  if (canUseDOM !== true) {
    return {}
  }

  const results = {}
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
  if (tag.length > 0) {
    results.script = tag[0].outerHTML
  }
  tag = el.getElementsByTagName('style')
  if (tag.length > 0) {
    results.style = tag[0].outerHTML
  }
  return results
}

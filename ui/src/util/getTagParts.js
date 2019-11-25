// 'use strict'

export default function (html) {
  const canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  )
  if (canUseDOM !== true) {
    return {}
  }

  let results = {}, tag
  // we'll use document to separate out of the sections,
  // but we can't use it for the <template> tags. Not only
  // does it reformat the html, it also removed any dynamic
  // vue properties.
  let template = getTemplate(html)
  if (template && template.length > 0) {
    results.template = template
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

const getTemplate = (html) => {
  let content = ''
  if (html && html.length > 0) {
    const start = '<template',
      end = '</template>'
    // find the first occurrence of "<template"
    let startIndex = html.indexOf(start)
    // find the last occurrence of "</template>"
    let lastIndex = html.lastIndexOf(end)
    if (startIndex > -1 && lastIndex > -1) {
      // grab the text
      content = html.substring(startIndex, lastIndex + end.length)
    }
  }
  return content
}

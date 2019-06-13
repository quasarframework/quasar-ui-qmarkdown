export default function (html) {
  let results = {
    template: '',
    style: '',
    script: ''
  }
  let tag
  let el = document.createElement('html')
  el.innerHTML = html
  tag = el.getElementsByTagName('template')
  if (tag.length > 0) {
    results.template = tag[0].outerHTML
  }
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

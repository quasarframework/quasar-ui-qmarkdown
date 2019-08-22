const Prism = require('prismjs')

export default function prismHighlight (str, lang) {
  if (lang === '') {
    lang = 'js'
  } else if (lang === 'vue' || lang === 'html') {
    lang = 'html'
  }

  if (Prism.languages[lang] !== void 0) {
    const code = Prism.highlight(str, Prism.languages[lang], lang)

    return `<pre class="q-markdown--code q-markdown--code__inner language-${lang}">` +
      `<code>${code}</code>` +
      `</pre>`
  }

  return ''
}

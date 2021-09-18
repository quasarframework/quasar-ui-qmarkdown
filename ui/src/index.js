import pkg from '../package.json'
const { version } = pkg
import QMarkdown, { useQMarkdownGlobalProps } from './components/QMarkdown'
import getTagParts from './util/getTagParts'

export {
  version,
  QMarkdown,
  useQMarkdownGlobalProps,
  getTagParts
}

export default {
  version,
  QMarkdown,
  useQMarkdownGlobalProps,
  getTagParts,

  install (app) {
    app.component(QMarkdown.name, QMarkdown)
  }
}

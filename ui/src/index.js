import { version } from '../package.json'
import QMarkdown from './components/QMarkdown'
import getTagParts from './util/getTagParts'

export {
  version,
  QMarkdown,
  getTagParts
}

export default {
  version,
  QMarkdown,
  getTagParts,

  install (Vue) {
    Vue.component(QMarkdown.name, QMarkdown)
  }
}

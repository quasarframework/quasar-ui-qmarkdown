import { version } from '../package.json'
import QMarkdown from './components/QMarkdown'

export {
  version,
  QMarkdown
}

export default {
  version,
  QMarkdown,

  install (Vue) {
    Vue.component(QMarkdown.name, QMarkdown)
  }
}

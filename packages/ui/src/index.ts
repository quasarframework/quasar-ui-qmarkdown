import type { App } from 'vue'

import QMarkdown, { useQMarkdownGlobalProps } from './components/QMarkdown'
import getTagParts from './util/getTagParts'
import { version } from './version'

export { version, QMarkdown, useQMarkdownGlobalProps, getTagParts }
export type {
  MarkdownItPlugin,
  MarkdownItPluginWithOptions,
  MarkdownItPluginsArray,
  MarkdownItLinkifyOptions,
} from '../types/types'

function install(app: App): void {
  app.component(String(QMarkdown.name), QMarkdown)
}

export default {
  version,
  QMarkdown,
  useQMarkdownGlobalProps,
  getTagParts,
  install,
}

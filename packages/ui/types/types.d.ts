import type { MarkdownIt } from 'markdown-it'
import type { VueClassProp, VueStyleProp } from './vue-prop-types'

export * from './vue-prop-types'

export interface TocDefinition {
  id: string
  label: string
  level?: number
  children?: TocDefinitionArray
}

export type TocDefinitionArray = TocDefinition[]

export type MarkdownItPlugin = (md: MarkdownIt, ...params: any[]) => void

export interface MarkdownItPluginWithOptions {
  plugin: MarkdownItPlugin
  options: unknown
}

export type MarkdownItPluginsArray = Array<MarkdownItPlugin | MarkdownItPluginWithOptions>

export type MarkdownItLinkifyOptions = Parameters<MarkdownIt['linkify']['set']>[0]

export interface QMarkdownGlobalProps {
  src?: string
  lineNumberAlt?: string
  toc?: boolean
  inline?: boolean
  tocStart?: number
  tocEnd?: number
  contentClass?: VueClassProp
  contentStyle?: VueStyleProp
  noBlockquote?: boolean
  noBreaks?: boolean
  noContainer?: boolean
  noHeadingAnchorLinks?: boolean
  noHighlight?: boolean
  noHtml?: boolean
  noImage?: boolean
  noLineNumbers?: boolean
  noLink?: boolean
  noLinkify?: boolean
  linkifyOptions?: MarkdownItLinkifyOptions
  noNoopener?: boolean
  noNoreferrer?: boolean
  noTypographer?: boolean
  showCopy?: boolean
  copyIcon?: string
  doneIcon?: string
  noCopyTooltip?: boolean
  copyTooltipText?: string
  copyResponseText?: string
  fixCr?: boolean
  plugins?: MarkdownItPluginsArray
}

export declare function useQMarkdownGlobalProps(props: QMarkdownGlobalProps): void

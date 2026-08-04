declare module 'markdown-it-imsize/dist/markdown-it-imsize.js' {
  import type { MarkdownIt } from 'markdown-it'

  const plugin: (md: MarkdownIt) => void
  export default plugin
}

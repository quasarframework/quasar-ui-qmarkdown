import markdownItMermaid from '@markslides/markdown-it-mermaid'
import type { MarkdownIt } from 'markdown-it'

interface MermaidApi {
  renderAll: () => Promise<void>
}

interface MarkdownItWithMermaid extends MarkdownIt {
  mermaid?: MermaidApi
}

let mermaidApi: MermaidApi | undefined

export function mermaidPlugin(md: MarkdownIt): void {
  markdownItMermaid(md, { securityLevel: 'strict' })
  mermaidApi = (md as MarkdownItWithMermaid).mermaid
}

export async function renderMermaid(): Promise<void> {
  await mermaidApi?.renderAll()
}

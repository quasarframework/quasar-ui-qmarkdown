import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createFolder, writeFile } from './build.utils'

interface ApiEntry {
  desc?: string
  type?: string | string[]
  tsType?: string
  values?: unknown[]
}

interface ComponentApi {
  props?: Record<string, ApiEntry>
  events?: Record<string, ApiEntry>
  methods?: Record<string, ApiEntry>
  slots?: Record<string, ApiEntry>
  [key: string]: unknown
}

const buildDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(buildDir, '..')
const srcDir = path.join(rootDir, 'src/components')
const apiDir = path.join(rootDir, 'dist/api')
const typesDir = path.join(rootDir, 'dist/types')
const veturDir = path.join(rootDir, 'dist/vetur')
const sourceTypesFile = path.join(rootDir, 'types/types.d.ts')
const sourceVuePropTypesFile = path.join(rootDir, 'types/vue-prop-types.ts')
const distTypesFile = path.join(typesDir, 'types.d.ts')
const distVuePropTypesFile = path.join(typesDir, 'vue-prop-types.ts')
const distIndexFile = path.join(typesDir, 'index.d.ts')

function camelCase(value: string): string {
  return value.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase())
}

function getDescription(entry: ApiEntry): string {
  return typeof entry.desc === 'string' ? entry.desc.replace(/\*\//g, '* /') : ''
}

function getComment(entry: ApiEntry, indent = '  '): string {
  const desc = getDescription(entry)

  if (!desc) {
    return ''
  }

  return `${indent}/**\n${indent} * ${desc.replace(/\n/g, `\n${indent} * `)}\n${indent} */\n`
}

function normalizeType(type: string | string[] | undefined): string | undefined {
  return Array.isArray(type) ? type[0] : type
}

function getType(entry: ApiEntry): string {
  if (entry.tsType) {
    return entry.tsType
  }

  if (Array.isArray(entry.values) && entry.values.length > 0) {
    return entry.values.map((value) => JSON.stringify(value)).join(' | ')
  }

  switch (normalizeType(entry.type)) {
    case 'Array':
      return 'unknown[]'
    case 'Boolean':
      return 'boolean'
    case 'Function':
      return '(...args: unknown[]) => unknown'
    case 'Number':
      return 'number'
    case 'Object':
      return 'Record<string, unknown>'
    case 'String':
      return 'string'
    default:
      return 'unknown'
  }
}

function getPropsTypes(api: ComponentApi): string {
  return Object.entries(api.props || {})
    .map(([name, entry]) => `${getComment(entry)}  ${camelCase(name)}?: ${getType(entry)}`)
    .join('\n')
}

function getTypesFile(api: ComponentApi): string {
  const props = getPropsTypes(api)

  return `import type { App as Application, ComponentPublicInstance, DefineComponent } from 'vue'
import { TocDefinitionArray, VueClassProp, VueStyleProp, useQMarkdownGlobalProps } from './types'
import type { MarkdownItPluginsArray } from './types'

export interface QMarkdown extends ComponentPublicInstance {
  makeTree(data: TocDefinitionArray): TocDefinitionArray
}

export interface QMarkdownProps {
${props}
}

export interface QMarkdownTagParts {
  template?: string
  script?: string
  style?: string
}

export function getTagParts(html?: string): QMarkdownTagParts
export const version: string

type QMarkdownComponent = DefineComponent<
  QMarkdownProps,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
> & {
  new (): QMarkdown
}

export const QMarkdown: QMarkdownComponent

export interface QMarkdownPlugin {
  version: string
  QMarkdown: QMarkdownComponent
  useQMarkdownGlobalProps: typeof useQMarkdownGlobalProps
  getTagParts: typeof getTagParts
  install(app: Application): void
}

declare const plugin: QMarkdownPlugin
export default plugin
export * from './types'
export as namespace QMarkdown
`
}

function getVeturTags(api: ComponentApi): Record<string, unknown> {
  return {
    'q-markdown': {
      description: 'Display inline markdown in your Quasar App',
      attributes: Object.keys(api.props || {}),
    },
  }
}

function getVeturAttributes(api: ComponentApi): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(api.props || {}).map(([name, entry]) => [
      `q-markdown/${name}`,
      {
        type: getType(entry),
        description: getDescription(entry),
      },
    ]),
  )
}

export async function buildApi(): Promise<void> {
  const api = JSON.parse(
    fs.readFileSync(path.join(srcDir, 'QMarkdown.json'), 'utf-8'),
  ) as ComponentApi

  createFolder('dist')
  createFolder('dist/api')
  createFolder('dist/types')
  createFolder('dist/vetur')

  await Promise.all([
    writeFile(path.join(apiDir, 'QMarkdown.json'), JSON.stringify(api, null, 2) + '\n'),
    writeFile(distTypesFile, fs.readFileSync(sourceTypesFile, 'utf-8')),
    writeFile(distVuePropTypesFile, fs.readFileSync(sourceVuePropTypesFile, 'utf-8')),
    writeFile(path.join(veturDir, 'tags.json'), JSON.stringify(getVeturTags(api), null, 2) + '\n'),
    writeFile(
      path.join(veturDir, 'attributes.json'),
      JSON.stringify(getVeturAttributes(api), null, 2) + '\n',
    ),
    writeFile(distIndexFile, getTypesFile(api)),
  ])

  console.log(' 🧾 Generated 1 API file')
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  buildApi().catch((err: unknown) => {
    console.error(err)
    process.exit(1)
  })
}

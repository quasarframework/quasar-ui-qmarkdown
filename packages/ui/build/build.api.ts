import fs, { existsSync, rmSync } from 'node:fs'
import path, { extname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { createFolder, writeFile } from './build.utils'

type QPressApiEntry = {
  docsUrl?: string
  generatedSuffix?: string
  group?: 'functions' | 'methods'
  input: string
  output: string
  type?: string
}

type QPressConfig = {
  api?: {
    entries?: QPressApiEntry[]
  }
}

type QPressApiModule = {
  generateQPressApi: (options: {
    cwd: string
    entries: QPressApiEntry[]
    generatedSuffix?: string
    writeOutput?: boolean
  }) => Promise<unknown>
}

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
const repoRoot = resolve(rootDir, '../..')
const apiDir = path.join(rootDir, 'dist/api')
const typesDir = path.join(rootDir, 'dist/types')
const qpressConfigCandidates = ['qpress.config.mjs', 'qpress.config.js', 'qpress.config.json']
const sourceTypesFile = path.join(rootDir, 'types/types.d.ts')
const sourceVuePropTypesFile = path.join(rootDir, 'types/vue-prop-types.ts')
const distTypesFile = path.join(typesDir, 'types.d.ts')
const distVuePropTypesFile = path.join(typesDir, 'vue-prop-types.ts')
const distIndexFile = path.join(typesDir, 'index.d.ts')

function camelCase(value: string): string {
  return value.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase())
}

function resolveModuleSpecifier(specifier: string): string {
  if (specifier.startsWith('.') || specifier.startsWith('/')) {
    return pathToFileURL(resolve(process.cwd(), specifier)).href
  }

  return specifier
}

async function loadQPressApiModule(): Promise<QPressApiModule> {
  const specifier =
    process.env.QPRESS_API_MODULE ??
    '@md-plugins/quasar-app-extension-q-press/dist/api/qpress-api.js'

  return import(resolveModuleSpecifier(specifier)) as Promise<QPressApiModule>
}

async function readQPressConfig(): Promise<QPressConfig> {
  const qpressConfigPath = qpressConfigCandidates
    .map((file) => resolve(repoRoot, file))
    .find((file) => existsSync(file))

  if (qpressConfigPath === undefined) {
    throw new Error(`Missing Q-Press config: ${qpressConfigCandidates.join(', ')}`)
  }

  if (extname(qpressConfigPath) === '.json') {
    return JSON.parse(fs.readFileSync(qpressConfigPath, 'utf-8')) as QPressConfig
  }

  const configModule = (await import(pathToFileURL(qpressConfigPath).href)) as {
    default?: QPressConfig
  }

  return configModule.default ?? (configModule as QPressConfig)
}

async function getQPressEntries(): Promise<QPressApiEntry[]> {
  const config = await readQPressConfig()
  const entries = config.api?.entries ?? []

  if (entries.length === 0) {
    throw new Error('No Q-Press API entries configured.')
  }

  return entries
}

async function generateApiJson(): Promise<ComponentApi> {
  const entries = await getQPressEntries()
  const qpressApi = await loadQPressApiModule()

  rmSync(apiDir, { force: true, recursive: true })
  createFolder('dist')
  createFolder('dist/api')

  await qpressApi.generateQPressApi({
    cwd: repoRoot,
    entries,
    generatedSuffix: '',
    writeOutput: true,
  })

  return JSON.parse(fs.readFileSync(path.join(apiDir, 'QMarkdown.json'), 'utf-8')) as ComponentApi
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

function getValueType(value: unknown, entryType: string | undefined): string {
  if (entryType === 'Number' && typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
    return value
  }

  return JSON.stringify(value)
}

function getType(entry: ApiEntry): string {
  if (entry.tsType) {
    return entry.tsType
  }

  const normalizedType = normalizeType(entry.type)

  if (Array.isArray(entry.values) && entry.values.length > 0) {
    return entry.values.map((value) => getValueType(value, normalizedType)).join(' | ')
  }

  switch (normalizedType) {
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

export async function buildApi(): Promise<void> {
  const api = await generateApiJson()

  createFolder('dist/types')

  await Promise.all([
    writeFile(distTypesFile, fs.readFileSync(sourceTypesFile, 'utf-8')),
    writeFile(distVuePropTypesFile, fs.readFileSync(sourceVuePropTypesFile, 'utf-8')),
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

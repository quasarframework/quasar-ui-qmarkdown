const fs = require("fs");
const path = require("path");

const typesFile = path.resolve(__dirname, "../dist/types/index.d.ts");
const waitTimeout = 30000;
const waitInterval = 100;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForTypesFile() {
  const start = Date.now();

  while (fs.existsSync(typesFile) !== true) {
    if (Date.now() - start > waitTimeout) {
      throw new Error(`Timed out waiting for ${typesFile}`);
    }

    await sleep(waitInterval);
  }
}

function mergeTypeImports(code) {
  return code.replace(/import \{ ([^}]+) \} from '\.\/types'/, (_match, imports) => {
    const names = new Set(imports.split(",").map((name) => name.trim()));
    names.add("TocDefinitionArray");
    names.add("VueStyleProp");
    names.add("useQMarkdownGlobalProps");

    return `import { ${Array.from(names).join(", ")} } from './types'`;
  });
}

async function patchTypes() {
  await waitForTypesFile();

  let code = fs.readFileSync(typesFile, "utf8");

  code = code.replace(
    "import type { ComponentPublicInstance, ComponentOptions } from 'vue'",
    "import type { App as Application, ComponentPublicInstance, DefineComponent } from 'vue'",
  );

  code = code.replace(/export interface TocDefinitionArray \{[\s\S]*?\n\}\n\n(?=import \{)/, "");

  code = mergeTypeImports(code);

  code = code.replace(
    "export const QMarkdown: ComponentOptions\n",
    `export interface QMarkdownTagParts {
    template?: string
    script?: string
    style?: string
}

export function getTagParts(html?: string): QMarkdownTagParts
export const version: string

type QMarkdownComponent = DefineComponent<
    Record<string, any>,
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
`,
  );

  fs.writeFileSync(typesFile, code);
}

module.exports = { patchTypes };

if (require.main === module) {
  patchTypes().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

import { MarkdownIt } from "@types/markdown-it";
export * from "./vue-prop-types";

export interface TocDefinition {
    id: String,
    label: string,
    level?: number,
    children?: TocDefinitionArray
  };
export type TocDefinitionArray = TocDefinition[];

export interface MarkdownItPlugin = MarkdownIt.PluginSimple | MarkdownIt.PluginWithOptions | MarkdownIt.PluginWithParams;
export type MarkdownItPluginsArray = MarkdownItPlugin[];

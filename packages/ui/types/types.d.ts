import MarkdownIt from "markdown-it";
export * from "./vue-prop-types";

export interface TocDefinition {
  id: string;
  label: string;
  level?: number;
  children?: TocDefinitionArray;
}

export type TocDefinitionArray = TocDefinition[];

export type MarkdownItPlugin =
  | MarkdownIt.PluginSimple
  | MarkdownIt.PluginWithOptions
  | MarkdownIt.PluginWithParams;
export type MarkdownItPluginsArray = MarkdownItPlugin[];

interface QMarkdownGlobalProps {
  lineNumberAlt?: string;
  noBlockquote?: boolean;
  noBreaks?: boolean;
  noContainer?: boolean;
  noHeadingAnchorLinks?: boolean;
  noHighlight?: boolean;
  noHtml?: boolean;
  noImage?: boolean;
  noLineNumbers?: boolean;
  noLink?: boolean;
  noLinkify?: boolean;
  noTypographer?: boolean;
}

declare function useQMarkdownGlobalProps(props: QMarkdownGlobalProps): void;

export { useQMarkdownGlobalProps, QMarkdownGlobalProps };

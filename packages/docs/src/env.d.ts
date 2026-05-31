/// <reference types="@quasar/app-vite/client" />

declare module "@datatraccorporation/markdown-it-mermaid";
declare module "markdown-it-abbr";
declare module "markdown-it-deflist";
declare module "markdown-it-emoji" {
  import type MarkdownIt from "markdown-it";

  type EmojiOptions = {
    defs?: Record<string, string>;
    enabled?: string[];
    shortcuts?: Record<string, string | string[]>;
  };

  type EmojiPlugin = MarkdownIt.PluginWithOptions<EmojiOptions>;

  export const bare: EmojiPlugin;
  export const light: EmojiPlugin;
  export const full: EmojiPlugin;
}
declare module "markdown-it-footnote";
declare module "markdown-it-imsize/dist/markdown-it-imsize.js";
declare module "markdown-it-ins";
declare module "markdown-it-mark";
declare module "markdown-it-sub";
declare module "markdown-it-sup";
declare module "markdown-it-task-lists";
declare module "markdown-it-texmath";

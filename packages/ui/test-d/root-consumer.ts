import type { App, Component } from "vue";

import QMarkdownPlugin, {
  QMarkdown,
  getTagParts,
  useQMarkdownGlobalProps,
  version,
  type QMarkdown as QMarkdownInstance,
  type TocDefinitionArray,
} from "@quasar/quasar-ui-qmarkdown";
import QMarkdownApi from "@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json";

declare const app: App;
declare const qMarkdown: QMarkdownInstance;

app.use(QMarkdownPlugin);
app.component("QMarkdown", QMarkdown);

const component: Component = QMarkdown;
const tocData: TocDefinitionArray = [{ id: "intro", label: "Intro", level: 1, children: [] }];
const tocTree: TocDefinitionArray = qMarkdown.makeTree(tocData);

useQMarkdownGlobalProps({
  src: "# Hello",
  toc: true,
  tocStart: 1,
  tocEnd: 6,
  contentClass: ["docs-markdown"],
  contentStyle: [{ color: "var(--q-primary)" }],
  inline: true,
  showCopy: true,
  plugins: [],
});

const parts = getTagParts("<template><div>Hello</div></template>");

component.name?.toString();
parts.template?.toUpperCase();
tocTree.at(0)?.id.toUpperCase();
version.toUpperCase();
QMarkdownApi.props.src.desc.toUpperCase();

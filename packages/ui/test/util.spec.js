import { describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import { createSSRApp, h, nextTick, reactive } from "vue";
import { renderToString } from "@vue/server-renderer";

import QMarkdownComponent, { getMarkdownCopyText } from "../src/components/QMarkdown";
import extendBlockQuote from "../src/util/extendBlockQuote";
import extendContainers from "../src/util/extendContainers";
import extendFenceLineNumbers from "../src/util/extendFenceLineNumbers";
import extendHeading from "../src/util/extendHeading";
import extendLink from "../src/util/extendLink";
import extendTable from "../src/util/extendTable";
import extendToken from "../src/util/extendToken";
import prismHighlight from "../src/util/highlight";
import makeTree from "../src/util/makeTree";
import normalizeSlotSource from "../src/util/normalizeSlotSource";
import slugify from "../src/util/slugify";

function createMarkdown() {
  return new MarkdownIt({ html: true });
}

const testDir = dirname(fileURLToPath(import.meta.url));

function readPackageFile(path) {
  return readFileSync(resolve(testDir, "..", path), "utf8");
}

function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function getRange(from, to) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}

function getValidatorValues(source, propName) {
  const propBlock = source.match(new RegExp(`^ {4}${propName}: \\{([\\s\\S]*?)^ {4}\\},`, "m"));
  const validator = propBlock?.[1].match(/validator: \(v\) => v >= (\d+) && v <= (\d+)/);

  return validator === undefined || validator === null
    ? []
    : getRange(Number(validator[1]), Number(validator[2]));
}

function createQMarkdownProps(overrides = {}) {
  return {
    src: "",
    toc: false,
    tocStart: 1,
    tocEnd: 3,
    plugins: [],
    ...overrides,
  };
}

describe("slugify", () => {
  it("trims, collapses whitespace and URI-encodes the label", () => {
    expect(slugify("  Hello   QMarkdown  ")).toBe("Hello-QMarkdown");
    expect(slugify("Résumé Notes")).toBe("R%C3%A9sum%C3%A9-Notes");
  });
});

describe("prismHighlight", () => {
  it("defaults empty language values to js", () => {
    const Prism = {
      languages: { js: {} },
      highlight: vi.fn((code, _grammar, lang) => `${lang}:${code}`),
    };

    expect(prismHighlight(Prism, "const answer = 42", "")).toBe(
      '<pre class="q-markdown--code q-markdown--code__inner language-js"><code>js:const answer = 42</code></pre>\n',
    );
  });

  it("maps vue fences to html highlighting", () => {
    const Prism = {
      languages: { html: {} },
      highlight: vi.fn((code, _grammar, lang) => `${lang}:${code}`),
    };

    expect(prismHighlight(Prism, "<template />", "vue")).toContain("language-html");
    expect(Prism.highlight).toHaveBeenCalledWith("<template />", Prism.languages.html, "html");
  });

  it("returns an empty string for unknown languages", () => {
    expect(prismHighlight({ languages: {} }, "code", "unknown")).toBe("");
  });
});

describe("normalizeSlotSource", () => {
  it("removes common template indentation from slotted markdown", () => {
    expect(
      normalizeSlotSource(`
        # Title

        Some **bold** text.

            const answer = 42
      `),
    ).toBe("# Title\n\nSome **bold** text.\n\n    const answer = 42");
  });

  it("preserves relative indentation inside the markdown", () => {
    expect(
      normalizeSlotSource(`
        - parent
          - child
      `),
    ).toBe("- parent\n  - child");
  });
});

describe("makeTree", () => {
  it("nests toc entries by heading level", () => {
    const toc = [
      { id: "intro", label: "Intro", level: 1, children: [] },
      { id: "install", label: "Install", level: 2, children: [] },
      { id: "vite", label: "Vite", level: 3, children: [] },
      { id: "usage", label: "Usage", level: 2, children: [] },
    ];

    expect(makeTree(toc, 1)).toEqual([
      {
        id: "intro",
        label: "Intro",
        level: 1,
        children: [
          {
            id: "install",
            label: "Install",
            level: 2,
            children: [{ id: "vite", label: "Vite", level: 3, children: [] }],
          },
          { id: "usage", label: "Usage", level: 2, children: [] },
        ],
      },
    ]);
  });

  it("does not throw when toc data starts deeper than toc-start", () => {
    const toc = [
      { id: "first-h2", label: "First H2", level: 2, children: [] },
      { id: "child-h3", label: "Child H3", level: 3, children: [] },
    ];

    expect(makeTree(toc, 1)).toEqual([
      {
        id: "first-h2",
        label: "First H2",
        level: 2,
        children: [{ id: "child-h3", label: "Child H3", level: 3, children: [] }],
      },
    ]);
  });
});

describe("QMarkdown API JSON", () => {
  it("documents the runtime props, events, slots and exposed methods", () => {
    const source = readPackageFile("src/components/QMarkdown.js");
    const api = JSON.parse(readPackageFile("src/components/QMarkdown.json"));

    const propsBlock = source.match(/props:\s*\{([\s\S]*?)\n\s{2}\},\n\n\s{2}emits:/);
    const sourceProps = [...propsBlock[1].matchAll(/^ {4}([a-zA-Z]\w*):/gm)]
      .map((match) => toKebabCase(match[1]))
      .sort();

    const emitsBlock = source.match(/emits:\s*\[([^\]]*)\]/);
    const sourceEvents = [...emitsBlock[1].matchAll(/["']([^"']+)["']/g)]
      .map((match) => match[1])
      .sort();

    const exposeBlock = source.match(/expose\(\s*\{([\s\S]*?)\}\s*\)/);
    const sourceMethods = [...exposeBlock[1].matchAll(/\b([a-zA-Z]\w*)\b/g)]
      .map((match) => match[1])
      .sort();

    const sourceSlots = [...source.matchAll(/\bslots\.([a-zA-Z]\w*)\b/g)]
      .map((match) => match[1])
      .sort();

    expect(Object.keys(api.props).sort()).toEqual(sourceProps);
    expect(Object.keys(api.events).sort()).toEqual(sourceEvents);
    expect(Object.keys(api.slots).sort()).toEqual(sourceSlots);
    expect(Object.keys(api.methods).sort()).toEqual(sourceMethods);
  });

  it("documents runtime validator ranges for numeric props", () => {
    const source = readPackageFile("src/components/QMarkdown.js");
    const api = JSON.parse(readPackageFile("src/components/QMarkdown.json"));

    expect(api.props["toc-start"].values).toEqual(getValidatorValues(source, "tocStart"));
    expect(api.props["toc-end"].values).toEqual(getValidatorValues(source, "tocEnd"));
  });
});

describe("QMarkdown component contract", () => {
  it("excludes generated line numbers from copied rendered text", () => {
    const lineNumbers = { style: { display: "" } };
    const element = {
      querySelectorAll: vi.fn(() => [lineNumbers]),
      get innerText() {
        return lineNumbers.style.display === "none"
          ? "console.log(1)\nconsole.log(2)"
          : "1\n2\nconsole.log(1)\nconsole.log(2)";
      },
    };

    expect(getMarkdownCopyText(element)).toBe("console.log(1)\nconsole.log(2)");
    expect(lineNumbers.style.display).toBe("");
  });

  it("exposes the documented component name, event and toc validators", () => {
    expect(QMarkdownComponent.name).toBe("QMarkdown");
    expect(QMarkdownComponent.emits).toEqual(["data"]);
    expect(QMarkdownComponent.props.tocStart.validator(1)).toBe(true);
    expect(QMarkdownComponent.props.tocStart.validator(6)).toBe(true);
    expect(QMarkdownComponent.props.tocStart.validator(0)).toBe(false);
    expect(QMarkdownComponent.props.tocEnd.validator(1)).toBe(true);
    expect(QMarkdownComponent.props.tocEnd.validator(6)).toBe(true);
    expect(QMarkdownComponent.props.tocEnd.validator(7)).toBe(false);
  });

  it("invalidates rendered markdown when fix-cr changes the effective source", async () => {
    const props = reactive(createQMarkdownProps({ src: "Hello\\nWorld", fixCr: false }));
    const render = QMarkdownComponent.setup(props, {
      slots: {},
      emit: vi.fn(),
      expose: vi.fn(),
    });

    expect(render().props.innerHTML).toContain("Hello\\nWorld");

    props.fixCr = true;
    await nextTick();

    expect(render().props.innerHTML).toContain("Hello<br>");
  });

  it("renders markdown during SSR", async () => {
    const app = createSSRApp({
      render: () => h(QMarkdownComponent, { src: "# hello world" }),
    });

    const html = await renderToString(app);

    expect(html).toContain('class="q-markdown');
    expect(html).toContain("<h1");
    expect(html).toContain("hello world");
  });
});

describe("markdown-it render extensions", () => {
  it("adds QMarkdown classes to inline code tokens", () => {
    const md = createMarkdown();
    extendToken(md);

    expect(md.render("Use `code` here.")).toContain('<code class="q-markdown--token">code</code>');
  });

  it("adds QMarkdown classes to blockquotes", () => {
    const md = createMarkdown();
    extendBlockQuote(md);

    expect(md.render("> Important note")).toContain('<blockquote class="q-markdown--note">');
  });

  it("adds QMarkdown classes to tables", () => {
    const md = createMarkdown();
    extendTable(md);

    expect(md.render("| A |\n| - |\n| B |")).toContain('<table class="q-markdown--table">');
  });

  it("adds line number wrappers only for multi-line fences", () => {
    const md = createMarkdown();
    extendFenceLineNumbers(md);

    expect(md.render("```js\none\ntwo\nthree\n```")).toContain(
      '<div class="q-markdown--line-numbers-wrapper">',
    );
    expect(md.render("```js\none\n```")).not.toContain("q-markdown--line-numbers non-selectable");
  });

  it("renders note containers with the expected classes and title", () => {
    const md = createMarkdown();
    extendContainers(md);

    const html = md.render("::: warning Pay attention\nBody\n:::");

    expect(html).toContain(
      '<div class="q-markdown--note q-markdown--note--warning"><p class="q-markdown--note-title">Pay attention</p>',
    );
  });

  it("classifies local and external links", () => {
    const md = createMarkdown();
    extendLink(md, {});

    expect(md.render("[Docs](/docs)")).toContain(
      '<a href="/docs" class="q-markdown--link q-markdown--link-local">',
    );
    expect(md.render("[Quasar](https://quasar.dev)")).toContain(
      '<a href="https://quasar.dev" class="q-markdown--link q-markdown--link-external" target="_blank" rel="noopener noreferrer">',
    );
  });

  it("classifies hash links as local when rendering without browser location", () => {
    const md = createMarkdown();
    extendLink(md, {});

    expect(md.render("[Section](#section)")).toContain(
      '<a href="#section" class="q-markdown--link q-markdown--link-local">',
    );
  });

  it("adds heading ids, classes and toc entries", () => {
    const md = createMarkdown();
    const toc = [];
    extendHeading(md, toc, true);

    const html = md.render("# Hello QMarkdown");

    expect(html).toContain('id="hello-qmarkdown"');
    expect(html).toContain('class="q-markdown--heading q-markdown--heading-h1');
    expect(toc).toEqual([
      { id: "hello-qmarkdown", label: "Hello QMarkdown", level: 1, children: [] },
    ]);
  });

  it("generates unique ids and toc entries for repeated headings", () => {
    const md = createMarkdown();
    const toc = [];
    extendHeading(md, toc, true, 1, 6);

    const html = md.render("## Training\n\n## Training\n\n## Training");

    expect(html).toContain('id="training"');
    expect(html).toContain('id="training-1"');
    expect(html).toContain('id="training-2"');
    expect(html).toContain('href="#training-1"');
    expect(toc).toEqual([
      { id: "training", label: "Training", level: 2, children: [] },
      { id: "training-1", label: "Training", level: 2, children: [] },
      { id: "training-2", label: "Training", level: 2, children: [] },
    ]);
  });

  it("resets duplicate heading counters for each render", () => {
    const md = createMarkdown();
    extendHeading(md, [], false, 1, 6);

    md.render("## Training\n\n## Training");
    const html = md.render("## Training");

    expect(html).toContain('id="training"');
    expect(html).not.toContain('id="training-2"');
  });
});

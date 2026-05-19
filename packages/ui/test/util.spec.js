import { describe, expect, it, vi } from "vitest";
import MarkdownIt from "markdown-it";

import extendBlockQuote from "../src/util/extendBlockQuote";
import extendContainers from "../src/util/extendContainers";
import extendFenceLineNumbers from "../src/util/extendFenceLineNumbers";
import extendHeading from "../src/util/extendHeading";
import extendLink from "../src/util/extendLink";
import extendTable from "../src/util/extendTable";
import extendToken from "../src/util/extendToken";
import prismHighlight from "../src/util/highlight";
import slugify from "../src/util/slugify";

function createMarkdown() {
  return new MarkdownIt({ html: true });
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
});

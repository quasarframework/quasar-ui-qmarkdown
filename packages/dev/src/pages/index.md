# Hello world!

This is a markdown file.

```js [numbered rem=2 add=4,6-7 highlight=11]
export default function (ctx) { // can be async too
  console.log(ctx)

  // Example output on console:
  {
    dev: true,
    prod: false
  }

  const foo = import.meta.env.QCLI_FOO // ✅ App envs are exposed through import.meta.env

  // context gets generated based on the parameters
  // with which you run "quasar dev" or "quasar build"
}
```

```json [rem=1]
{
  "min": 0,
  "super": false, [[! rem]]
  "super": true, [[! add]]
  "max": 100
}
```

```diff
@@ -13,6 +13,8 @@ const langList = [
   { name: 'xml' },
   { name: 'nginx' },
   { name: 'html' },
+
+  // special grammars:
   { name: 'diff' }
 ]

@@ -20,6 +22,12 @@ loadLanguages(langList.map(l => l.name))

 const langMatch = langList.map(l => l.aliases || l.name).join('|')

+/**
+ * lang -> one of the supported languages (langList)
+ * attrs -> optional attributes:
+ *    * numbered - lines are numbered
+ * title -> optional card title
+ */
 const definitionLineRE = new RegExp(
   '^' +
   `(?<lang>(tabs|${ langMatch }))` + // then a language name
@@ -28,6 +36,10 @@ const definitionLineRE = new RegExp(
   '$'
 )

+/**
+ * <<| lang [attrs] [title] |>>
+ * ...content...
+ */
 const tabsLineRE = new RegExp(
   '^<<\\|\\s+' + // starts with "<<|" + at least one space char
   `(?<lang>${ langMatch })` + // then a language name
@@ -72,29 +84,65 @@ function extractTabs (content) {
       const props = tabMap[ tabName ]
       return (
         `<q-tab-panel class="q-pa-none" name="${ tabName }">` +
-        `<pre v-pre class="doc-code">${ highlight(props.content.join('\n'), props.attrs) }</pre>` +
-        '<copy-button />' +
+        highlight(props.content.join('\n'), props.attrs) +
         '</q-tab-panel>'
       )
     }).join('\n')
   }
 }

-function highlight (content, attrs) {
-  const { lang, numbered } = attrs
-  const highlightedText = prism.highlight(content, prism.languages[ lang ], lang)
+const magicCommentRE = / *\/\/\[! (?<klass>[\w-]+)\] */
+const magicCommentGlobalRE = new RegExp(magicCommentRE, 'g')

-  if (numbered === true) {
-    const lines = highlightedText.split('\n')
-    const lineCount = ('' + highlightedText.length).length
+function getLineClasses (content, highlightedLines) {
+  const lines = content.split('\n')
```

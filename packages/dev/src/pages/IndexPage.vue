<template>
  <q-page class="row items-center justify-evenly">
    <q-markdown :src="markdown" />
  </q-page>
</template>

<script setup lang="ts">
const markdown = String.raw`# Hello world!
This is a markdown file.

\`\`\`ts [numbered rem=2 add=4,6-7 highlight=11] Title
export default function (ctx) { // can be async too
  console.log(ctx)

  // Example output on console:
  {
    dev: true,
    prod: false
  }

  const foo = import.meta.env.QCLI_FOO // App envs are exposed through import.meta.env

  // context gets generated based on the parameters
  // with which you run "quasar dev" or "quasar build"
}
\`\`\`

\`\`\`json [rem=1] Title 2
{
  "min": 0,
  "super": false, [[! rem]]
  "super": true, [[! add]]
  "max": 100
}
\`\`\`

\`\`\`diff
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
\`\`\``;
</script>

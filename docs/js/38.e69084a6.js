(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[38],{"15bc":function(n,e,o){"use strict";o.r(e),e["default"]='<template>\n  <div class="q-pa-md q-gutter-sm">\n    <q-toggle v-model="model" label="Disable highlighting"></q-toggle>\n    <q-markdown\n      :no-highlight="model"\n      no-line-numbers\n      show-copy\n    >\n    Indented code\n\nInline `code`\n\n    // Some comments\n    line 1 of code\n    line 2 of code\n    line 3 of code\n\nBlock code "fences"\n\n```\nSample text here...\n```\n\nSyntax highlighting\n\n```js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```\n    </q-markdown>\n  </div>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      model: false\n    }\n  }\n}\n<\/script>\n'}}]);
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable highlighting"></q-toggle>
    <q-markdown
      :no-highlight="model"
      no-line-numbers
      show-copy
    >
    Indented code

Inline `code`

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

```
Sample text here...
```

Syntax highlighting

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'

export default defineComponent({
  name: 'CopyToClipboard',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false)

    return {
      model
    }
  }
})
</script>
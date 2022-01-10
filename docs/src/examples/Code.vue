<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable highlighting"
    />
    <q-toggle
      v-model="model2"
      label="Disable line numbers"
    />
    <q-toggle
      v-model="model3"
      label="Toggle line numbers"
    />
    <!-- eslint-disable vue/html-indent -->
    <q-markdown
      :no-highlight="model"
      :no-line-numbers="model2"
      :line-number-alt="model3 ? '$' : undefined"
    >
    Indented code (4 spaces)

Inline `code`

    // Some comments (4 spaces on all)
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
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Code',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false),
      model2 = ref(false),
      model3 = ref(false)

    return {
      model,
      model2,
      model3
    }
  }
})
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- eslint-disable vue/html-indent -->
    <q-markdown>
Unordered

+ Create an unordered list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
- Marker character change forces new list start:
* Ac tristique libero volutpat at
+ Facilisis in pretium nisl aliquet
- Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Create an ordered list by starting a line with a number (ie: `1.`)
2. Lorem ipsum dolor sit amet
3. Consectetur adipiscing elit
4. Integer molestie lorem at massa
---

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`
indented
1. List with a container
    ::: info
    use 3 or more spaces
    :::
1. List with code
    ```js
    var foo = function (bar) {
    return bar++;
    };

    console.log(foo(5));
    ```

Different lists must be split or the lists will be combined (see code):

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar
2. baz
    </q-markdown>
    <!-- eslint-enable vue/html-indent -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Lists',
  components: {
    QMarkdown
  }
})
</script>
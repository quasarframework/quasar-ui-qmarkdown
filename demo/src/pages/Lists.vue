<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Lists">
      <template v-slot:markdown>
Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
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

Lists must be split or you get this behavior:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar
      </template>
      <template v-slot:input>
Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
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

Lists must be split or you get this behavior:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar
      </template>
    </show-markdown>
  </div>
</template>

<script>
import ShowMarkdown from '../components/ShowMarkdown'

export default {
  components: {
    ShowMarkdown
  }
}
</script>

<style>
</style>

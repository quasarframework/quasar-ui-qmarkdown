<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown>
Max fixed size image: 200x200; responsive
![Minion](https://octodex.github.com/images/minion.png =200x200)

Max fixed size image: 300x300; with title; responsive
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat" =300x300)

Responsive image - adjust browser to see auto-resize
![Minion](https://octodex.github.com/images/minion.png "Responsive Image")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

    </q-markdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Images">
      <template v-slot:markdown>
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
      </template>
      <template v-slot:input>
Fixed size image: 200x200
![Minion](https://octodex.github.com/images/minion.png =200x200)

Fixed size image: 300x300, with title
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat" =300x300)

Responsive image, adjust browser to see auto-resize
![Minion](https://octodex.github.com/images/minion.png "Responsive Image")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
      </template>
    </show-markdown>
  </div>
</template>

<script>
import ShowMarkdown from '../components/ShowMarkdown'

export default {
  components: {
    ShowMarkdown
  },
  data () {
    return {
    }
  }
}
</script>

<style>
</style>

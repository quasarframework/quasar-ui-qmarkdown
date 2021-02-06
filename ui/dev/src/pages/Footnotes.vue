<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable footnotes"
    />
    <q-markdown
      :no-footnote="model"
    >
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have `markup`**
  and multiple paragraphs.

[^second]: Footnote text.
    </q-markdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false
    }
  }
}
</script>

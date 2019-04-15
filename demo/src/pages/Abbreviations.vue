<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Abbreviations">
      <template v-slot:markdown>
This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
      </template>
      <template v-slot:input>
This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
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

<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Subscript/Superscript">
      <template v-slot:markdown>
- 19^th^
- H~2~O
      </template>
      <template v-slot:input>
- 19^th^
- H~2~O
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

<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Marked">
      <template v-slot:markdown>
==This sentence is is marked.==

This is ==marked== in the middle of a sentence.
      </template>
      <template v-slot:input>
==This sentence is is marked.==

This is ==marked== in the middle of a sentence.
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

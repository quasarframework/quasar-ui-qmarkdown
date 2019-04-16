<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Titles">
      <template v-slot:markdown>
Top-Level Title
===

Second-Level Title
---
      </template>
      <template v-slot:input>
Top-Level Title
===

Second-Level Title
---
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

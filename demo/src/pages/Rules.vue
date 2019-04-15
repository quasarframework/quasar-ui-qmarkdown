<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Horizontal Rules">
      <template v-slot:markdown>
___

---

***
      </template>
      <template v-slot:input>
___

---

***
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

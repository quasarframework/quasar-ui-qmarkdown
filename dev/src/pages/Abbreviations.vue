<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable abbreviations"
    />
    <q-markdown
      :no-abbreviation="model"
    >
This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
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

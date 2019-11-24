<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable mark"></q-toggle>
    <q-markdown
      :no-mark="model"
    >
==This sentence is is marked.==

This is ==marked== in the middle of a sentence.
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

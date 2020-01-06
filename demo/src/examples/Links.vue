<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable links"></q-toggle>
    <q-toggle v-model="model1" label="Disable linkify"></q-toggle>
    <q-markdown
      :no-link="model"
      :no-linkify="model1"
    >
[External Link](https://github.com/quasarframework/quasar)

[local link](/demo)

[link with title](https://github.com/quasarframework/quasar/ "title text!")

Auto-converted link: https://github.com/quasarframework/quasar
    </q-markdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false,
      model1: false
    }
  }
}
</script>

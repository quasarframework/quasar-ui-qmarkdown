<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable emojies"></q-toggle>
    <q-markdown
      :no-emoji="model"
    >
Classic markup: :wink: :joy: :cry: :angel: :heart: :beers: :laughing: :yum:

Shortcuts (emoticons): :-) :-( 8-) ;)
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

<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Links">
      <template v-slot:markdown>
Links are auto-detected for local or external. External links use `.q-markdown--link-external:after` to show an icon indicator.

You can override in CSS the `content` attribute to change the icon.

[External Link](https://github.com/quasarframework/quasar)

[local link](/heading)

[link with title](https://github.com/quasarframework/quasar/ "title text!")

Autoconverted link https://github.com/quasarframework/quasar
      </template>
      <template v-slot:input>
[External Link](https://github.com/quasarframework/quasar)

[local link](/heading)

[link with title](https://github.com/quasarframework/quasar/ "title text!")

Autoconverted link https://github.com/quasarframework/quasar
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

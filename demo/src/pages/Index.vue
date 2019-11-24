<template>
  <hero>
    <!-- <q-markdown src="markdown" /> -->
  </hero>
</template>

<script>
import Hero from '../components/Hero'
// import markdownVue from '../markdown/markdown.vmd'
// import markdown from '../markdown/markdown.md'

export default {
  name: 'PageIndex',

  data () {
    return {
      // markdown: markdown
    }
  },

  components: {
    Hero
    // markdownVue
  }
}
</script>

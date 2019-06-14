<template>
  <hero>
    <!-- <q-markdown :src="markdown" toc @data="onToc" /> -->
    <markdown-vue />
  </hero>
</template>

<script>
// import getTagParts from '@quasar/quasar-app-extension-qmarkdown/src/lib/getTagParts'
// const getTagParts = require('@quasar/quasar-app-extension-qmarkdown/src/lib/getTagParts').default
import Hero from '../components/Hero'
import markdownVue from '../markdown/markdown.vmd'

export default {
  name: 'PageIndex',

  components: {
    Hero,
    markdownVue
  },

  data () {
    return {
      // markdown: markdown
    }
  },

  mounted () {
    // eslint-disable-next-line import/no-webpack-loader-syntax
    // const results = getTagParts(require('!!raw-loader!../components/Hero.vue').default)

    // console.log('template', results.template)
    // console.log('script', results.script)
    // console.log('css', results.css)
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    onToc (toc) {
      this.toc = toc
    }
  }
}
</script>

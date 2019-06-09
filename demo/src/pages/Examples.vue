<template>
  <q-page padding>
    Coming soon!
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  mounted () {
    this.toc = []
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
  }
}
</script>

<style>
</style>

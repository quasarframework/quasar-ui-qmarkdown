<template>
  <q-layout view="HHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title v-if="$q.screen.width > 500">
          Quasar Markdown
          <q-tooltip v-if="$q.screen.width < 1077">
            Quasar Markdown
          </q-tooltip>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-style="background-color: #f8f8ff"
    >
      <markdown-types />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import MarkdownTypes from '../components/MarkdownTypes'

export default {
  name: 'MarkdownLayout',
  components: {
    MarkdownTypes
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>

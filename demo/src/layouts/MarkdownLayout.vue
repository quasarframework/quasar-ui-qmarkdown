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
          QMarkdown <span class="text-subtitle2">v{{ version }}</span>
          <q-tooltip v-if="$q.screen.width < 1077">
            QMarkdown <span class="text-subtitle2">v{{ version }}</span>
          </q-tooltip>
        </q-toolbar-title>

        <q-btn flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-expansion-item
        expand-separator
        default-opened
        group="somegroup"
        icon="fas fa-cogs"
        label="Playground"
        caption="Markdown Types"
      >
        <markdown-types />
      </q-expansion-item>
        <q-expansion-item
          expand-separator
          group="somegroup"
          icon="fas fa-link"
          label="Essential Links"
        >
        <essential-links />
        </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import MarkdownTypes from '../components/MarkdownTypes'
import { version } from '@quasar/quasar-app-extension-qmarkdown/package.json'

export default {
  name: 'MarkdownLayout',
  components: {
    MarkdownTypes,
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      version: version,
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

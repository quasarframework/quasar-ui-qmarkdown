<template>
  <q-layout view="HHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        />

        <q-toolbar-title v-if="$q.screen.width > 500">
          QMarkdown <span class="text-subtitle2">v{{ version }}</span> (markdown-it! <span class="text-subtitle2">v{{ mdVersion }}</span>)
        </q-toolbar-title>

        <q-space />

        <q-btn flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
        <div v-if="$q.screen.width > 500">Quasar v{{ $q.version }}</div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      aria-label="Menu"
      class="menu"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-separator />
      </q-list>
      <essential-links />
      <q-separator />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { version } from 'ui'
import { version as mdVersion } from 'markdown-it/package.json'

export default {
  name: 'MarkdownLayout',
  components: {
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      version,
      mdVersion,
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL
  }
}
</script>

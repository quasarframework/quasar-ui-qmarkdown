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

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-style="background-color: #f8f8ff"
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
          <q-list>
            <q-item clickable tag="a" target="_blank" href="http://quasar.dev">
              <q-item-section avatar>
                <q-icon name="school"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Docs</q-item-label>
                <q-item-label caption>quasar.dev</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
              <q-item-section avatar>
                <q-icon name="code"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Github</q-item-label>
                <q-item-label caption>github.com/quasarframework</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="http://chat.quasar.dev">
              <q-item-section avatar>
                <q-icon name="chat"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Discord Chat Channel</q-item-label>
                <q-item-label caption>chat.quasar.dev</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
              <q-item-section avatar>
                <q-icon name="record_voice_over"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Forum</q-item-label>
                <q-item-label caption>forum.quasar.dev</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
              <q-item-section avatar>
                <q-icon name="rss_feed"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Twitter</q-item-label>
                <q-item-label caption>@quasarframework</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable to="/docs">
              <q-item-section avatar>
                <q-icon name="calendar_today" />
              </q-item-section>
              <q-item-section>
                <q-item-label>QMarkdown docs</q-item-label>
                <q-item-label caption>Documentation</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/demo">
              <q-item-section avatar>
                <q-icon name="calendar_today" />
              </q-item-section>
              <q-item-section>
                <q-item-label>QMarkdown demo</q-item-label>
                <q-item-label caption>Interactively play with properties</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable to="/examples">
              <q-item-section avatar>
                <q-icon name="calendar_today" />
              </q-item-section>
              <q-item-section>
                <q-item-label>QMarkdown examples</q-item-label>
                <q-item-label caption>Examples of how to do it</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
    MarkdownTypes
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

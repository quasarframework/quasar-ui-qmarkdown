<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          to="/"
          icon="home"
        />

        <q-toolbar-title>
          QMarkdown <span class="text-subtitle2">v{{ version }}</span>
        </q-toolbar-title>

        <q-btn
          flat
          round
          :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'"
          @click="$q.dark.toggle()"
        />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'ui' // "ui" is aliased in quasar.conf.js

export default {
  name: 'MainLayout',

  data () {
    return {
      version
    }
  }
}
</script>

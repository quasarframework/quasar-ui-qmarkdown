<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :plugins="plugins" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'

const markdown = `- 19^th^
- H~2~O`

defineOptions({ name: 'SubscriptSuperscript' })

const plugins = [subscript, superscript]
</script>

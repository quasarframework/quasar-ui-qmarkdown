<template>
  <div class="q-pa-md q-gutter-md">
    <p>
      <q-markdown inline :src="intro" />
    </p>

    <p>
      <template v-for="(line, index) in supportLines" :key="line">
        <q-markdown inline :src="line" />
        <br v-if="index < supportLines.length - 1" />
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const intro = 'Render **inline markdown** inside an existing paragraph.'

const supportLines = ['**Support Hotline**', 'mon-fri: +49 1234 56789', 'weekends: +49 9876 54321']

defineOptions({ name: 'Inline' })
</script>

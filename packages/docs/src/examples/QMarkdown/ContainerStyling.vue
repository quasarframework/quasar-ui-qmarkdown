<template>
  <div class="q-pa-md">
    <q-markdown content-class="container-styling-example" :src="markdown" />
  </div>
</template>

<script setup lang="ts">
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

const markdown = `::: tip Styled container
Use a \`content-class\` to keep custom container styles local to this QMarkdown instance.

Container content can include **formatting**, inline \`tokens\`, and [links](https://quasar.dev).
:::`

defineOptions({ name: 'ContainerStyling' })
</script>

<style lang="scss">
.container-styling-example {
  --q-markdown-link-color: var(--qpress-color-primary, var(--q-primary));

  .q-markdown--note--tip {
    border-left-color: var(--qpress-color-primary, var(--q-primary));
    background: color-mix(in srgb, var(--qpress-color-primary, var(--q-primary)) 12%, transparent);
    color: var(--qpress-text-primary, currentColor);
  }

  .q-markdown--note-title {
    color: var(--qpress-color-primary, var(--q-primary));
  }

  .q-markdown--token {
    border-color: color-mix(
      in srgb,
      var(--qpress-color-primary, var(--q-primary)) 50%,
      transparent
    );
    background: color-mix(in srgb, var(--qpress-color-primary, var(--q-primary)) 18%, transparent);
    color: var(--qpress-text-primary, currentColor);
  }
}

.body--dark .container-styling-example {
  .q-markdown--note--tip {
    background: color-mix(
      in srgb,
      var(--qpress-color-primary, #81d4fa) 16%,
      var(--qpress-surface-raised, #1d1d1d)
    );
    color: var(--qpress-text-primary, #f5f5f5);
  }
}
</style>

<template>
  <json-api-viewer
    title="QMarkdown API"
    :json="json"
    no-menu
  />
</template>

<script>
import { defineComponent } from 'vue'
import Api from '@quasar/quasar-ui-qmarkdown/dist/api/QMarkdown.json'

export default defineComponent({
  name: 'QMarkdownJsonApi',
  setup () {
    return {
      json: Api
    }
  }
})
</script>

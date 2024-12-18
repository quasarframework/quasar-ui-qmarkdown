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

// For Global Settings testing purposes
// import { useQMarkdownGlobalProps } from "@quasar/quasar-ui-qmarkdown"
// useQMarkdownGlobalProps({
//   lineNumberAlt: "$",
//   noBlockquote: false,
//   noBreaks: true,
//   noContainer: true,
//   noHeadingAnchorLinks: true,
//   noHighlight: true,
//   noHtml: true,
//   noImage: true,
//   noLineNumbers: true,
//   noLink: true,
//   noLinkify: true,
//   noTypographer: true,
// })

export default defineComponent({
  name: 'QMarkdownJsonApi',
  setup () {
    return {
      json: Api
    }
  }
})
</script>

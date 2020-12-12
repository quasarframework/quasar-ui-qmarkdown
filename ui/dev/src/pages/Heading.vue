<template>
  <div class="q-pa-md q-gutter-sm" style="max-width: 800px; width: 100%;">
    <q-toggle v-model="model" label="Disable Heading Anchor Links (hover to see difference)"></q-toggle>
    <div class="q-ma-md q-gutter-sm">
      <div>The TOC (Table of Contents) Start and End properties also control the Heading anchor links</div>
      <div>TOC Start: {{ range.min }}</div>
      <div>TOC End: {{ range.max }}</div>
    </div>
    <q-range
      v-model="range"
      :min="1"
      :max="6"
      label-always
    />
    <q-markdown
      :no-heading-anchor-links="model"
      :toc-start="range.min"
      :toc-end="range.max"
    >
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
    </q-markdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false,
      range: {
        min: 1,
        max: 3
      }
    }
  }
}
</script>

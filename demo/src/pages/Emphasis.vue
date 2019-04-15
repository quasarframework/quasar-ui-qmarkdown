<template>
  <div class="q-pa-md q-gutter-sm">
    <show-markdown label="Emphasis">
      <template v-slot:markdown>
**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

**_This is bold italic text_**

___This is bold italic text___

~~Strikethrough~~
      </template>
      <template v-slot:input>
**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

**_This is bold italic text_**

___This is bold italic text___

~~Strikethrough~~
      </template>
    </show-markdown>
  </div>
</template>

<script>
import ShowMarkdown from '../components/ShowMarkdown'

export default {
  components: {
    ShowMarkdown
  }
}
</script>

<style>
</style>

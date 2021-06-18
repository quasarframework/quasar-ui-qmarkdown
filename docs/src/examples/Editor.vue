<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="noHtml"
      label="Disable HTML"
    />
    <q-toggle
      v-model="noLink"
      label="Disable Link"
    />
    <q-toggle
      v-model="noLinkify"
      label="Disable Linkify"
    />
    <q-toggle
      v-model="noTypographer"
      label="Disable Typographer"
    />
    <q-toggle
      v-model="noBreaks"
      label="Disable Breaks"
    />
    <q-toggle
      v-model="noHighlight"
      label="Disable Highlight"
    />
    <q-toggle
      v-model="noEmoji"
      label="Disable Emoji"
    />
    <q-toggle
      v-model="noSubscript"
      label="Disable Subscript"
    />
    <q-toggle
      v-model="noSuperscript"
      label="Disable Superscript"
    />
    <q-toggle
      v-model="noFootnote"
      label="Disable Footnote"
    />
    <q-toggle
      v-model="noDeflist"
      label="Disable Deflist"
    />
    <q-toggle
      v-model="noAbbreviation"
      label="Disable Abbreviation"
    />
    <q-toggle
      v-model="noInsert"
      label="Disable Insert"
    />
    <q-toggle
      v-model="noMark"
      label="Disable Mark"
    />
    <q-toggle
      v-model="noImage"
      label="Disable Image"
    />
    <q-toggle
      v-model="noTasklist"
      label="Disable Tasklist"
    />
    <q-toggle
      v-model="noContainer"
      label="Disable Container"
    />
    <div class="q-pa-md q-gutter-sm fit">
      <q-markdown
      >
## Interactive Editor

Add Markdown to the window on the left and the output will appear on the right.
      </q-markdown>
      <q-splitter
        v-model="splitterModel"
        style="height: 500px;"
      >
        <template v-slot:separator>
          <q-avatar color="primary" text-color="white" size="28px" icon="fas fa-arrows-alt-h" />
        </template>

        <template v-slot:before>
          <div class="q-pa-md">
            <textarea
              v-model="markdown"
              :rows="20"
              class="fit q-pa-sm"
            />
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md" style="height: 467px;">
            <q-markdown
              v-model:src="markdown"
              :noHtml="noHtml"
              :noLink="noLink"
              :noLinkify="noLinkify"
              :noTypographer="noTypographer"
              :noBreaks="noBreaks"
              :noHighlight="noHighlight"
              :noEmoji="noEmoji"
              :noSubscript="noSubscript"
              :noSuperscript="noSuperscript"
              :noFootnote="noFootnote"
              :noDeflist="noDeflist"
              :noAbbreviation="noAbbreviation"
              :noInsert="noInsert"
              :noMark="noMark"
              :noImage="noImage"
              :noTasklist="noTasklist"
              :noContainer="noContainer"
              class="fit bordered q-pa-sm"
            >
            </q-markdown>
          </div>
        </template>
      </q-splitter>
    </div>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Editor',
  components: {
    QMarkdown
  },

  setup () {
    console.log(QMarkdown)
    const
      splitterModel = ref(50),
      markdown = ref('Testing'),
      noHtml = ref(false),
      noLink = ref(false),
      noLinkify = ref(false),
      noTypographer = ref(false),
      noBreaks = ref(false),
      noHighlight = ref(false),
      noEmoji = ref(false),
      noSubscript = ref(false),
      noSuperscript = ref(false),
      noFootnote = ref(false),
      noDeflist = ref(false),
      noAbbreviation = ref(false),
      noInsert = ref(false),
      noMark = ref(false),
      noImage = ref(false),
      noTasklist = ref(false),
      noContainer = ref(false)

    return {
      splitterModel,
      markdown,
      noHtml,
      noLink,
      noLinkify,
      noTypographer,
      noBreaks,
      noHighlight,
      noEmoji,
      noSubscript,
      noSuperscript,
      noFootnote,
      noDeflist,
      noAbbreviation,
      noInsert,
      noMark,
      noImage,
      noTasklist,
      noContainer
    }
  }
})
</script>
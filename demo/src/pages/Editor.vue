<template>
  <hero>
    <div class="row q-pa-sm">
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
    </div>
    <q-markdown>
# Interactive Editor

Add Markdown to the window on the left and the output will appear on the right. You can even add HTML, but you cannot add Vue components as they would not be compiled in the browser.
    </q-markdown>
    <div class="q-pa-md q-gutter-sm fit">
      <q-markdown
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
      >
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
              rows="20"
              class="fit q-pa-sm"
            />
      </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md" style="height: 467px;">
            <q-markdown
              :src="markdown"
              class="fit bordered q-pa-sm"
            >
            </q-markdown>
          </div>
        </template>
      </q-splitter>

    </div>
  </hero>
</template>

<script>
import Hero from '../components/Hero'

export default {
  name: 'Editor',

  components: {
    Hero
  },

  data () {
    return {
      splitterModel: 50,
      markdown: '',
      noHtml: false,
      noLink: false,
      noLinkify: false,
      noTypographer: false,
      noBreaks: false,
      noHighlight: false,
      noEmoji: false,
      noSubscript: false,
      noSuperscript: false,
      noFootnote: false,
      noDeflist: false,
      noAbbreviation: false,
      noInsert: false,
      noMark: false,
      noImage: false,
      noTasklist: false,
      noContainer: false
    }
  }
}
</script>

<style>
.bordered {
  border-width: 1px;
  border-style: solid;
  border-color: #a0a0a0;
  min-height: 200px;
}
.bordered:focus-within {
  border-color: #a00000;
}
</style>

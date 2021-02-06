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
        :no-html="noHtml"
        :no-link="noLink"
        :no-linkify="noLinkify"
        :no-typographer="noTypographer"
        :no-breaks="noBreaks"
        :no-highlight="noHighlight"
        :no-emoji="noEmoji"
        :no-subscript="noSubscript"
        :no-superscript="noSuperscript"
        :no-footnote="noFootnote"
        :no-deflist="noDeflist"
        :no-abbreviation="noAbbreviation"
        :no-insert="noInsert"
        :no-mark="noMark"
        :no-image="noImage"
        :no-tasklist="noTasklist"
        :no-container="noContainer"
      >
## Interactive Editor

Add Markdown to the window on the left and the output will appear on the right.
      </q-markdown>
      <q-splitter
        v-model="splitterModel"
        style="height: 500px;"
      >
        <template #separator>
          <q-avatar
            color="primary"
            text-color="white"
            size="28px"
            icon="fas fa-arrows-alt-h"
          />
        </template>

        <template #before>
          <div class="q-pa-md">
            <textarea
              v-model="markdown"
              rows="20"
              class="fit q-pa-sm"
            />
          </div>
        </template>

        <template #after>
          <div
            class="q-pa-md"
            style="height: 467px;"
          >
            <q-markdown
              :src="markdown"
              class="fit bordered q-pa-sm"
            />
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
export default {
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

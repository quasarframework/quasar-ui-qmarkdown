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
      v-model="noSubscript"
      label="Disable Subscript"
    />
    <q-toggle
      v-model="noEmoji"
      label="Disable Emoji"
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
    <q-toggle
      v-model="noMermaid"
      label="Disable Mermaid"
    />
    <div class="q-pa-md q-gutter-sm fit">
      <!-- eslint-disable vue/html-indent -->
      <q-markdown>
## Interactive Editor

Add Markdown to the window on the left and the output will appear on the right.
      </q-markdown>
      <!-- eslint-enable vue/html-indent -->
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
              :rows="20"
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
              :key="count"
              v-model:src="markdown"
              :no-html="noHtml"
              :no-link="noLink"
              :no-linkify="noLinkify"
              :no-typographer="noTypographer"
              :no-breaks="noBreaks"
              :no-highlight="noHighlight"
              :no-image="noImage"
              :no-container="noContainer"
              :plugins="plugins"
              class="fit bordered q-pa-sm"
            />
          </div>
        </template>
      </q-splitter>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, getCurrentInstance } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown'
import '@quasar/quasar-ui-qmarkdown/dist/index.css'

import abbreviation from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskLists from 'markdown-it-task-lists'
import mermaid from '@datatraccorporation/markdown-it-mermaid'

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
      noContainer = ref(false),
      noMermaid = ref(false),
      plugins = ref([]),
      count = ref(0)

    watch([
      noAbbreviation,
      noDeflist,
      noEmoji,
      noFootnote,
      noInsert,
      noMark,
      noSubscript,
      noSuperscript,
      noTasklist,
      noMermaid
    ], () => {
      rebuildPlugins()
    })

    function rebuildPlugins () {
      plugins.value.splice(0, plugins.value.length)

      if (noAbbreviation.value !== true) plugins.value.push(abbreviation)
      if (noDeflist.value !== true) plugins.value.push(deflist)
      if (noEmoji.value !== true) plugins.value.push(emoji)
      if (noFootnote.value !== true) plugins.value.push(footnote)
      if (noInsert.value !== true) plugins.value.push(insert)
      if (noMark.value !== true) plugins.value.push(mark)
      if (noSubscript.value !== true) plugins.value.push(subscript)
      if (noSuperscript.value !== true) plugins.value.push(superscript)
      if (noTasklist.value !== true) plugins.value.push(taskLists)
      if (noMermaid.value !== true) plugins.value.push(mermaid)

      // by having `:key="count"` on the q-markdown component,
      // we can force Vue to do a refresh when the plugins change
      count.value += 1
    }

    onMounted(() => {
      rebuildPlugins()
    })

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
      noContainer,
      noMermaid,
      plugins,
      count
    }
  }
})
</script>
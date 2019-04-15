<template>
<div>
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
  <q-list bordered>
    <q-expansion-item
      group="somegroup"
      :label="label"
      default-opened
      header-class="text-primary"
    >
      <q-card>
        <q-card-section>
          <q-markdown
            :noHtml="noHtml"
            :noLinkify="noLinkify"
            :noLink="noLink"
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
            :toc="toc"
            :tocStart="tocStart"
            :tocEnd="tocEnd"
            :taskListsEnable="taskListsEnable"
            :taskListsLabel="taskListsLabel"
            :taskListsLabelAfter="taskListsLabelAfter"
            style="overflow: auto;"
            @toc="v => $emit('toc', v)"
          >
            <slot name="markdown"></slot>
          </q-markdown>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-separator />
    <q-expansion-item group="somegroup" label="Markup" header-class="text-teal">
      <q-card>
        <q-card-section>
          <pre><code>
            <slot name="input"></slot>
          </code></pre>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</div>
</template>

<script>
export default {
  name: 'ShowMarkdown',

  props: {
    label: String,
    toc: Boolean,
    tocStart: Number,
    tocEnd: Number,
    taskListsEnable: Boolean,
    taskListsLabel: Boolean,
    taskListsLabelAfter: Boolean
  },

  data () {
    return {
      noHtml: false,
      noLinkify: false,
      noLink: false,
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
</style>

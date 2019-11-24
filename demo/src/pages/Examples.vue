<template>
  <hero>
    <div>

      <example-title title="Markdown" />

      <example-card title="Abbreviations" name="Abbreviations" :tag-parts="getTagParts(require('!!raw-loader!../examples/Abbreviations.vue').default)">
        <q-markdown>
Hover over the word **HTML** below to see the abbreviation.
        </q-markdown>
      </example-card>

      <example-card title="Blockquotes" name="Blockquotes" :tag-parts="getTagParts(require('!!raw-loader!../examples/Blockquotes.vue').default)">
      </example-card>

      <example-card title="Code" name="Code" :tag-parts="getTagParts(require('!!raw-loader!../examples/Code.vue').default)">
      </example-card>

      <example-card title="Containers" name="Containers" :tag-parts="getTagParts(require('!!raw-loader!../examples/Containers.vue').default)">
      </example-card>

      <example-card title="Definition Lists" name="DefinitionLists" :tag-parts="getTagParts(require('!!raw-loader!../examples/DefinitionLists.vue').default)">
      </example-card>

      <example-card title="Emojies" name="Emojies" :tag-parts="getTagParts(require('!!raw-loader!../examples/Emojies.vue').default)">
      </example-card>

      <example-card title="Emphasis" name="Emphasis" :tag-parts="getTagParts(require('!!raw-loader!../examples/Emphasis.vue').default)">
      </example-card>

      <example-card title="Footnotes" name="Footnotes" :tag-parts="getTagParts(require('!!raw-loader!../examples/Footnotes.vue').default)">
      </example-card>

      <example-card title="Heading" name="Heading" :tag-parts="getTagParts(require('!!raw-loader!../examples/Heading.vue').default)">
      </example-card>

      <example-card title="Horizontal Rules" name="HorizontalRules" :tag-parts="getTagParts(require('!!raw-loader!../examples/HorizontalRules.vue').default)">
      </example-card>

      <example-card title="Images" name="Images" :tag-parts="getTagParts(require('!!raw-loader!../examples/Images.vue').default)">
      </example-card>

      <example-card title="Insert" name="Insert" :tag-parts="getTagParts(require('!!raw-loader!../examples/Insert.vue').default)">
      </example-card>

      <example-card title="Links" name="Links" :tag-parts="getTagParts(require('!!raw-loader!../examples/Links.vue').default)">
        <q-markdown>
Links are auto-detected for local or external. External links use `.q-markdown--link-external:after` to show an icon indicator.

You can override in CSS the `content` attribute to change the icon. Otherwise, you need to load Material icons.
        </q-markdown>
      </example-card>

      <example-card title="Lists" name="Lists" :tag-parts="getTagParts(require('!!raw-loader!../examples/Lists.vue').default)">
      </example-card>

      <example-card title="Mark" name="Mark" :tag-parts="getTagParts(require('!!raw-loader!../examples/Mark.vue').default)">
      </example-card>

      <example-card title="Subscript/Superscript" name="SubscriptSuperscript" :tag-parts="getTagParts(require('!!raw-loader!../examples/SubscriptSuperscript.vue').default)">
      </example-card>

      <example-card title="Tables" name="Tables" :tag-parts="getTagParts(require('!!raw-loader!../examples/Tables.vue').default)">
      </example-card>

      <example-card title="Task Lists" name="TaskLists" :tag-parts="getTagParts(require('!!raw-loader!../examples/TaskLists.vue').default)">
      </example-card>

      <example-card title="Titles" name="Titles" :tag-parts="getTagParts(require('!!raw-loader!../examples/Titles.vue').default)">
      </example-card>

      <example-card title="Typography" name="Typography" :tag-parts="getTagParts(require('!!raw-loader!../examples/Typography.vue').default)">
      </example-card>

    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from 'ui'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle,
    ExampleCard
  },

  data () {
    return {
      tempToc: []
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    this.addToToc('Markdown')
    this.addToToc('Abbreviations', 2)
    this.addToToc('Blockquotes', 2)
    this.addToToc('Code', 2)
    this.addToToc('Containers', 2)
    this.addToToc('Definition Lists', 2)
    this.addToToc('Emojies', 2)
    this.addToToc('Emphasis', 2)
    this.addToToc('Footnotes', 2)
    this.addToToc('Heading', 2)
    this.addToToc('Horizontal Rules', 2)
    this.addToToc('Images', 2)
    this.addToToc('Insert', 2)
    this.addToToc('Links', 2)
    this.addToToc('Lists', 2)
    this.addToToc('Mark', 2)
    this.addToToc('Subscript/Superscript', 2)
    this.addToToc('Tables', 2)
    this.addToToc('Task Lists', 2)
    this.addToToc('Typography', 2)

    this.toc = this.tempToc
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    getTagParts,
    addToToc (name, level = 1) {
      const slug = slugify(name)
      this.tempToc.push({
        children: [],
        id: slug,
        label: name,
        level: level
      })
    }
  }
}
</script>

<style>
</style>

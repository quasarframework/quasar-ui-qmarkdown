<template>
  <hero>
    <div>

      <example-title title="Markdown" />

      <example-card title="Abbreviations" name="Abbreviations" >
        <q-markdown>
Hover over the word **HTML** below to see the abbreviation.
        </q-markdown>
      </example-card>

      <example-card title="Blockquotes" name="Blockquotes" >
      </example-card>

      <example-card title="Code" name="Code" >
      </example-card>

      <example-card title="Containers" name="Containers" >
      </example-card>

      <example-card title="Definition Lists" name="DefinitionLists" >
      </example-card>

      <example-card title="Emojies" name="Emojies" >
      </example-card>

      <example-card title="Emphasis" name="Emphasis" >
      </example-card>

      <example-card title="Footnotes" name="Footnotes" >
      </example-card>

      <example-card title="Heading" name="Heading" >
      </example-card>

      <example-card title="Horizontal Rules" name="HorizontalRules" >
      </example-card>

      <example-card title="Images" name="Images" >
      </example-card>

      <example-card title="Insert" name="Insert" >
      </example-card>

      <example-card title="Links" name="Links" >
        <q-markdown>
Links are auto-detected for local or external. External links use `.q-markdown--link-external:after` to show an icon indicator.

You can override in CSS the `content` attribute to change the icon. Otherwise, you need to load Material icons.
        </q-markdown>
      </example-card>

      <example-card title="Lists" name="Lists" >
      </example-card>

      <example-card title="Mark" name="Mark" >
      </example-card>

      <example-card title="Subscript/Superscript" name="SubscriptSuperscript" >
      </example-card>

      <example-card title="Tables" name="Tables" >
      </example-card>

      <example-card title="TaskLists" name="TaskLists" >
      </example-card>

      <example-card title="Titles" name="Titles" >
      </example-card>

      <example-card title="Typography" name="Typography" >
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
    // getTagParts,
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

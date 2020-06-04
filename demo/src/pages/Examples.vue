<template>
  <hero>
    <div>

      <example-title title="Markdown" />
      <q-markdown>
::: warning
Note that below, markdown is being used to display markdown examples, which could be interpreted, so you may not be able to see the exact markup being used. If you suspect this to be the case, view the source on Github instead (click Github icon).
:::
      </q-markdown>

      <example-viewer title="Abbreviations" file="Abbreviations" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown>
Hover over the word **HTML** below to see the abbreviation.
        </q-markdown>
      </example-viewer>

      <example-viewer title="Blockquotes" file="Blockquotes" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Code" file="Code" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Containers" file="Containers" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Definition Lists" file="DefinitionLists" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Emojies" file="Emojies" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Emphasis" file="Emphasis" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Footnotes" file="Footnotes" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Heading" file="Heading" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Horizontal Rules" file="HorizontalRules" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Images" file="Images" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Insert" file="Insert" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Links" file="Links" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown>
Links are auto-detected for local or external. External links use `.q-markdown--link-external:after` to show an icon indicator.

You can override in CSS the `content` attribute to change the icon. Otherwise, you need to load Material icons.
        </q-markdown>
      </example-viewer>
      <example-viewer title="Lists" file="Lists" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Mark" file="Mark" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Subscript/Superscript" file="SubscriptSuperscript" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Tables" file="Tables" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Task Lists" file="TaskLists" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown>
Task list have some special settings. By default, turning on these other options won't do anything. It is up to you to provide the CSS to support these options.

Here is some example CSS that you can take and modify to your liking:

```css
.task-list-item label {
  color: blue;
}
.task-list-item-label {
  color: red !important;
}
```
This is what is used in the example below. Play with the controls to see how the tasklist items are affected.
        </q-markdown>
      </example-viewer>
      <example-viewer title="Titles" file="Titles" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Typography" file="Typography" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />

    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import { slugify } from 'assets/page-utils'
import { version } from 'ui'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle
  },

  data () {
    return {
      tempToc: [],
      locationUrl: 'https://github.com/quasarframework/quasar-ui-qmarkdown/tree/dev/demo/src/examples/',
      jsPaths: [`https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@${version}/dist/index.umd.min.js`],
      cssPaths: [
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qmarkdown@${version}/dist/index.min.css`,
        'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.12.0/css/all.css'
      ]
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
    this.addToToc('Titles', 2)
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
    addToToc (name, level = 1) {
      let n = name
      if (level > 1) {
        n = 'example-' + n
      }
      const slug = slugify(n)
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

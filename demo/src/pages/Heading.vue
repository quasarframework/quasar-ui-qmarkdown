<template>
  <div class="row q-pa-md q-gutter-sm">
    <!-- <q-toggle
      v-model="toc"
      label="Table of Contents"
    /> -->
    <!-- <q-btn v-if="tocData.length > 0" dense color="primary" label="TOC">
      <q-menu>
        <q-list dense style="min-width: 100px">
          <q-item v-for="data in tocData" :key="data.id" clickable v-close-popup>
            <q-item-section>{{ data.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn> -->
    <div class="fit q-ps-xs">
      <show-markdown
        label="Heading"
        :toc="toc"
        :tocStart="tocStart"
        :tocEnd="tocEnd"
        @toc="onToc"
      >
        <template v-slot:markdown>
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
        </template>
        <template v-slot:input>
# h1 Heading 8-)<br>
## h2 Heading<br>
### h3 Heading<br>
#### h4 Heading<br>
##### h5 Heading<br>
###### h6 Heading<br>
        </template>
      </show-markdown>
    </div>
  </div>
</template>

<script>
import ShowMarkdown from '../components/ShowMarkdown'

export default {
  components: {
    ShowMarkdown
  },
  data () {
    return {
      toc: false,
      tocStart: undefined,
      tocEnd: undefined,
      tocData: []
    }
  },
  watch: {
    toc (val) {
      if (!val) {
        // empty contents of toc
        this.tocData = []
      }
    }
  },
  methods: {
    onToc (toc) {
      this.tocData = toc
    }
  }
}
</script>

<style>
</style>

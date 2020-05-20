<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable blockquote"></q-toggle>
    <q-markdown
      :no-blockquote="model"
    >
> This is a Blockquote
> with a `token` and a [link](https://quasar.dev)

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.
    </q-markdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: false
    }
  }
}
</script>

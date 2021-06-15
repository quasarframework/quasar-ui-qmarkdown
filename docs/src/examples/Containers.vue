<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle v-model="model" label="Disable container"></q-toggle>
    <q-toggle v-model="model2" label="Disable links"></q-toggle>
    <q-markdown
      :no-container="model"
      :no-link="model2"
    >
:::
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: info
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: info With Custom Title
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: tip
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: warning
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: danger
here be **dragons**
with a `token` and a [link](https://quasar.dev)
:::

::: danger Embedable
here be **dragons**
with a `token` and a [link](https://quasar.dev)
  ::: warning
  here be **dragons**
  with a `token` and a [link](https://quasar.dev)
::::::
    </q-markdown>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown/src/QMarkdown.js'
import '@quasar/quasar-ui-qmarkdown/src/QMarkdown.sass'

export default defineComponent({
  name: 'Containers',
  components: {
    QMarkdown
  },

  setup () {
    const model = ref(false),
      model2 = ref(false)

    return {
      model,
      model2
    }
  }
})
</script>
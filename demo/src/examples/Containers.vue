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
export default {
  data () {
    return {
      model: false,
      model2: false
    }
  }
}
</script>

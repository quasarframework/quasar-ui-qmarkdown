<template>
  <q-page padding>
    <show-markdown label="Containers">
      <template v-slot:markdown>
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
      </template>
      <template v-slot:input>
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
      </template>
    </show-markdown>
  </q-page>
</template>

<script>
import ShowMarkdown from '../components/ShowMarkdown'

export default {
  components: {
    ShowMarkdown
  }
}
</script>

<style>
</style>

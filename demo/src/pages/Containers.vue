<template>
  <q-page padding>
    <show-markdown label="Containers">
      <template v-slot:markdown>
:::
here be **dragons**
:::

::: info
here be **dragons**
:::

::: info With Custom Title
here be **dragons**
:::

::: tip
here be **dragons**
:::

::: warning
here be **dragons**
:::

::: danger
here be **dragons**
:::

::: danger Embedable
here be **dragons**
  ::: warning
  here be **dragons**
::::::
      </template>
      <template v-slot:input>
:::
here be **dragons**
:::

::: info
here be **dragons**
:::

::: info With Custom Title
here be **dragons**
:::

::: tip
here be **dragons**
:::

::: warning
here be **dragons**
:::

::: danger
here be **dragons**
:::

::: danger Embedable
here be **dragons**
  ::: warning
  here be **dragons**
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

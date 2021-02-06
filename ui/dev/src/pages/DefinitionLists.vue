<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable definition lists"
    />
    <q-markdown
      :no-deflist="model"
    >
Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

  Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b
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

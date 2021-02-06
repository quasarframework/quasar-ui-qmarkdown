<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable subscript"
    />
    <q-toggle
      v-model="model2"
      label="Disable superscript"
    />
    <q-markdown
      :no-subscript="model"
      :no-superscript="model2"
    >
- 19^th^
- H~2~O
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

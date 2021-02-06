<template>
  <div class="q-pa-md q-gutter-sm">
    <q-toggle
      v-model="model"
      label="Disable typographer"
    />
    <q-markdown
      :no-typographer="model"
    >
(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!...

!!!!!! ???? ,,  -- ---

Smartypants: "double quotes" and 'single quotes'
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

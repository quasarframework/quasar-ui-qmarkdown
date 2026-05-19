<template>
  <div class="q-pa-md q-gutter-sm">
    <q-markdown :src="markdown" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { QMarkdown } from "@quasar/quasar-ui-qmarkdown";
import "@quasar/quasar-ui-qmarkdown/dist/index.css";

const markdown = `1st way

___

2nd way

---

3rd way

***



1st way (with text)
___

2nd way (with text, becomes an anchor link)
---

3rd way (with text)
***`;

export default defineComponent({
  name: "HorizontalRules",
  components: {
    QMarkdown,
  },

  setup() {
    return {
      markdown,
    };
  },
});
</script>

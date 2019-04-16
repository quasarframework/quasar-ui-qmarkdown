<template>
  <div class="q-pa-xs">
    <div class="row" style="width: 100%">
      <div class="col-2 q-pa-md">
        <q-list dense bordered style="max-width: 100%;" class="fit">
          <q-item to="/heading" exact>
            <q-item-section  class="ellipsis">
              Heading
            </q-item-section>
          </q-item>
          <q-item to="/titles" exact>
            <q-item-section  class="ellipsis">
              Titles
            </q-item-section>
          </q-item>
          <q-item to="/typographic" exact>
            <q-item-section  class="ellipsis">
              Typographic
            </q-item-section>
          </q-item>
          <q-item to="/emphasis" exact>
            <q-item-section  class="ellipsis">
              Emphasis
            </q-item-section>
          </q-item>
          <q-item to="/rules" exact>
            <q-item-section  class="ellipsis">
              Horizontal Rules
            </q-item-section>
          </q-item>
          <q-item to="/blockquotes" exact>
            <q-item-section  class="ellipsis">
              Blockquotes
            </q-item-section>
          </q-item>
          <q-item to="/lists" exact>
            <q-item-section  class="ellipsis">
              Lists
            </q-item-section>
          </q-item>
          <q-item to="/code" exact>
            <q-item-section  class="ellipsis">
              Code
            </q-item-section>
          </q-item>
          <q-item to="/tables" exact>
            <q-item-section  class="ellipsis">
              Tables
            </q-item-section>
          </q-item>
          <q-item to="/links" exact>
            <q-item-section  class="ellipsis">
              Links
            </q-item-section>
          </q-item>
          <q-item to="/images" exact>
            <q-item-section  class="ellipsis">
              Images
            </q-item-section>
          </q-item>
          <q-item to="/tasklists" exact>
            <q-item-section  class="ellipsis">
              Task Lists
            </q-item-section>
          </q-item>
          <q-item to="/emojies" exact>
            <q-item-section  class="ellipsis">
              Emojies
            </q-item-section>
          </q-item>
          <q-item to="/subsuper" exact>
            <q-item-section class="ellipsis">
              Subscript/Superscript
            </q-item-section>
          </q-item>
          <q-item to="/footnotes" exact>
            <q-item-section  class="ellipsis">
              Footnotes
            </q-item-section>
          </q-item>
          <q-item to="/deflists" exact>
            <q-item-section  class="ellipsis">
              Definition Lists
            </q-item-section>
          </q-item>
          <q-item to="/abbreviations" exact>
            <q-item-section  class="ellipsis">
              Abbreviations
            </q-item-section>
          </q-item>
          <q-item to="/mark" exact>
            <q-item-section  class="ellipsis">
              Mark
            </q-item-section>
          </q-item>
          <q-item to="/insert" exact>
            <q-item-section  class="ellipsis">
              Insert
            </q-item-section>
          </q-item>
          <q-item to="/containers" exact>
            <q-item-section  class="ellipsis">
              Containers
            </q-item-section>
          </q-item>
          <q-item to="/editor" exact>
            <q-item-section  class="ellipsis">
              Editor
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>

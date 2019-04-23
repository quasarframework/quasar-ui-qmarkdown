<template>
  <div class="q-pa-xs">
    <div class="row" style="width: 100%">
      <div class="col-2 q-pa-md">
        <q-list dense bordered style="max-width: 100%;" class="fit">
          <q-item to="/demo/heading" exact>
            <q-item-section  class="ellipsis">
              Heading
            </q-item-section>
          </q-item>
          <q-item to="/demo/titles" exact>
            <q-item-section  class="ellipsis">
              Titles
            </q-item-section>
          </q-item>
          <q-item to="/demo/typographic" exact>
            <q-item-section  class="ellipsis">
              Typographic
            </q-item-section>
          </q-item>
          <q-item to="/demo/emphasis" exact>
            <q-item-section  class="ellipsis">
              Emphasis
            </q-item-section>
          </q-item>
          <q-item to="/demo/rules" exact>
            <q-item-section  class="ellipsis">
              Horizontal Rules
            </q-item-section>
          </q-item>
          <q-item to="/demo/blockquotes" exact>
            <q-item-section  class="ellipsis">
              Blockquotes
            </q-item-section>
          </q-item>
          <q-item to="/demo/lists" exact>
            <q-item-section  class="ellipsis">
              Lists
            </q-item-section>
          </q-item>
          <q-item to="/demo/code" exact>
            <q-item-section  class="ellipsis">
              Code
            </q-item-section>
          </q-item>
          <q-item to="/demo/tables" exact>
            <q-item-section  class="ellipsis">
              Tables
            </q-item-section>
          </q-item>
          <q-item to="/demo/links" exact>
            <q-item-section  class="ellipsis">
              Links
            </q-item-section>
          </q-item>
          <q-item to="/demo/images" exact>
            <q-item-section  class="ellipsis">
              Images
            </q-item-section>
          </q-item>
          <q-item to="/demo/tasklists" exact>
            <q-item-section  class="ellipsis">
              Task Lists
            </q-item-section>
          </q-item>
          <q-item to="/demo/emojies" exact>
            <q-item-section  class="ellipsis">
              Emojies
            </q-item-section>
          </q-item>
          <q-item to="/demo/subsuper" exact>
            <q-item-section class="ellipsis">
              Subscript/Superscript
            </q-item-section>
          </q-item>
          <q-item to="/demo/footnotes" exact>
            <q-item-section  class="ellipsis">
              Footnotes
            </q-item-section>
          </q-item>
          <q-item to="/demo/deflists" exact>
            <q-item-section  class="ellipsis">
              Definition Lists
            </q-item-section>
          </q-item>
          <q-item to="/demo/abbreviations" exact>
            <q-item-section  class="ellipsis">
              Abbreviations
            </q-item-section>
          </q-item>
          <q-item to="/demo/mark" exact>
            <q-item-section  class="ellipsis">
              Mark
            </q-item-section>
          </q-item>
          <q-item to="/demo/insert" exact>
            <q-item-section  class="ellipsis">
              Insert
            </q-item-section>
          </q-item>
          <q-item to="/demo/containers" exact>
            <q-item-section  class="ellipsis">
              Containers
            </q-item-section>
          </q-item>
          <q-item to="/demo/editor" exact>
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

<template>
  <v-navigation-drawer
    :value="value"
    :right="right"
    temporary
    fixed
  >
    <v-list>
      <v-list-item @click.native="right = !right">
        <v-list-item-action>
          <v-icon light>
            mdi-repeat
          </v-icon>
        </v-list-item-action>
        <v-list-item-title>Switch drawer (click me)</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  setup () {
  },
  data () {
    return {
      right: true
    }
  }
})
</script>

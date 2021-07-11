<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon @click.stop="$emit('onDrawer')" />
    <v-btn
      icon
      @click.stop="$emit('onMiniVariant')"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-btn
      icon
      @click.stop="$emit('onClipped')"
    >
      <v-icon>mdi-application</v-icon>
    </v-btn>
    <v-btn
      icon
      @click.stop="$emit('onFixed')"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-toolbar-title v-text="titleDescription" />
    <v-spacer />
    <v-btn
      icon
      @click.stop="$emit('onRightDrawer')"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    clipped: {
      type: Boolean,
      required: true,
      default: false
    },
    miniVariant: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['onDrawer', 'onClipped', 'onMiniVariant', 'onFixed', 'onRightDrawer'],
  setup () {
  },
  computed: {
    titleDescription () {
      return 'Playground Three.js'
    }
  }
})
</script>

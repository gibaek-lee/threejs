<template>
  <v-navigation-drawer
    :value="value"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
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
    },
    miniVariant: {
      type: Boolean,
      required: true,
      default: false
    },
    clipped: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup () {
  },
  data () {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Music Visualizer',
          to: '/music-visualizer'
        },
        {
          icon: 'mdi-lifebuoy',
          title: 'Haunted House',
          to: '/haunted-house'
        }
      ]
    }
  }
})
</script>

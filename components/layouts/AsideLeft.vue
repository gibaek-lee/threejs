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
        v-for="(item, i) in pathList"
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
import ThreejsComponentListJson from '~/static/threejs-component-list.json'

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
  computed: {
    pathList () {
      const threejsComponentList = JSON.parse(JSON.stringify(ThreejsComponentListJson))

      // todoc Material Design Icons - https://fonts.google.com/icons?selected=Material+Icons
      const itemList = [{ icon: 'mdi-apps', title: 'Welcome', to: '/' }]

      return threejsComponentList
        .reduce((a, c) => [...a, { icon: c.icon, title: c.langset, to: c.path }], itemList)
    }
  }
})
</script>

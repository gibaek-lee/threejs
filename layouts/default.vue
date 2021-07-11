<template>
  <v-app dark>
    <aside-left
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
    />
    <default-header
      :clipped="clipped"
      :fixed="fixed"
      :mini-variant="miniVariant"
      @onDrawer="drawer = !drawer"
      @onMiniVariant="miniVariant = !miniVariant"
      @onClipped="clipped = !clipped"
      @onFixed="fixed = !fixed"
      @onRightDrawer="rightDrawer = !rightDrawer"
    />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <aside-right v-model="rightDrawer" />
    <default-footer :fixed="fixed" />
  </v-app>
</template>

<script>
import AsideLeft from '~/components/layouts/AsideLeft.vue'
import AsideRight from '~/components/layouts/AsideRight.vue'
import DefaultFooter from '~/components/layouts/DefaultFooter.vue'
import DefaultHeader from '~/components/layouts/DefaultHeader.vue'

export default {
  components: {
    AsideLeft,
    AsideRight,
    DefaultFooter,
    DefaultHeader
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      rightDrawer: false
    }
  }
}
</script>

<style>
html,
body {
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  height: 100%;
}
</style>

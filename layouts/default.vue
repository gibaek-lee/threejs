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
  },
  watch: {
    drawer (cur) {
      // todoc vuetify bug
      // v-overlay를 dim의 역할로 left side navigator의 show/hide 조작을 하는데
      // drawer를 넘겨받아 true/false를 변경하지 않고 직접 해당 element에 접근해 css로 제어하고 있다.
      // 그러므로 drawer의 boolean 값과 v-overlay가 싱크가 맞는지 직접 확인해서 drawer를 변경해줘야 한다.
      this.$nextTick().then(() => {
        const isOveray = this.$root.$el.querySelector('.v-overlay')
        if (!isOveray && !cur) {
          this.drawer = !cur
        }
      })
    },
    rightDrawer (cur) {
      // todoc same as drawer
      this.$nextTick().then(() => {
        const isOveray = this.$root.$el.querySelector('.v-overlay')
        if (!isOveray && !cur) {
          this.rightDrawer = !cur
        }
      })
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

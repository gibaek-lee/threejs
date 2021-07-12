<template>
  <v-footer
    :absolute="!fixed"
    app
  >
    <span>&copy; {{ description }}</span>
  </v-footer>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    fixed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup () {

  },
  computed: {
    description () {
      return `${new Date().getFullYear()} Gibaek Lee. Web Frontend Developer`
    }
  }
})
</script>

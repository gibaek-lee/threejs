<template>
  <v-row
    class="page-intro"
    justify="center"
    align="center"
  >
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <ThreejsLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Three.js playground
        </v-card-title>
        <v-card-text>
          <p>
            Author: <em>Gibaek Lee</em>
          </p>
          <p
            v-for="item in profileInfoList"
            :key="item.id"
          >
            {{ item.desc }}
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              :title="item.id"
            >
              {{ item.langset }}
            </a>
          </p>.
          <hr class="my-3">
        </v-card-text>
        <v-card-actions class="canvas-playground-list">
          <v-spacer />
          <v-btn
            v-for="(item) in threejsComponentList"
            :key="item.icon"
            nuxt
            :to="item.path"
          >
            {{ item.langset }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ThreejsComponentListJson from '~/static/threejs-component-list.json'

export default defineComponent({
  head () {
    return {
      title: 'Threejs Playground',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Threejs Playground, experimental zone for three.js which is a library for webgl api.'
        },
        {
          hid: 'keyword',
          name: 'keyword',
          content: 'three.js, threejs, webgl, canvas, nuxt, vue'
        }
      ]
    }
  },
  computed: {
    profileInfoList () {
      return [
        {
          id: 'linkedin',
          desc: 'For more information on me, check out the',
          link: 'https://www.linkedin.com/in/gibaeklee/',
          langset: 'LinkedIn Profile'
        },
        {
          id: 'mailto',
          desc: 'If you have questions, please mail to',
          link: 'mailto:bbsnake10@gmail.com',
          langset: 'My GMail'
        },
        {
          id: 'issues',
          desc: 'Find a bug? Report it on the github',
          link: 'https://github.com/gibaek-lee/threejs/issues',
          langset: 'Issue Board'
        },
        {
          id: 'github',
          desc: 'Visit Github Project Repository',
          link: 'https://github.com/gibaek-lee/threejs',
          langset: 'here'
        }
      ]
    },
    threejsComponentList () {
      return JSON.parse(JSON.stringify(ThreejsComponentListJson))
    }
  }
})
</script>

<style lang="scss" scoped>
.page-intro {
  height: calc(100vh - 100px);
  overflow: auto;
}

.canvas-playground-list {
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;

  > a {
    margin-left: 8px;
    margin-bottom: 8px;
  }
}
</style>

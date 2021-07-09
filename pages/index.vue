<template>
  <v-row justify="center" align="center">
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
          <p>
            For more information on me, check out the <a
              href="https://www.linkedin.com/in/gibaeklee/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Profile
            </a>.
          </p>
          <p>
            If you have questions, please mail to <a
              href="mailto:bbsnake10@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              title="mailto"
            >
              My GMail
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/gibaek-lee/threejs/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              Issue Board
            </a>.
          </p>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/music-visualizer"
          >
            Music Visualizer
          </v-btn>
          <v-btn
            color="primary"
            nuxt
            to="/haunted-house"
          >
            Haunted House
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

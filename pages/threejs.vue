<template>
  <v-row class="threejs">
    <v-col class="col-controls">
      <v-btn
        small
        color="primary"
        dark
        class="change-update-mode"
        data-mode="orbit"
      >
        orbit
      </v-btn>
    </v-col>
    <v-col class="col-canvas">
      <canvas class="webgl" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.threejs {
  height: 100%;

  .col-controls {
    flex-grow: unset;

    .change-update-mode {
    }
  }

  .col-canvas {
    flex-grow: inherit;

    .webgl {
      outline: none;
    }
  }
}
</style>

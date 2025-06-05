<!-- src/App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-4" color="primary" dark>
              <v-card-title>TricTrac (Vuetify Shell)</v-card-title>
              <v-card-text>
                Vuetify is now configured! 🎉<br />
                In the next step, we’ll scaffold our board component and begin laying out the TricTrac grid.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
/* App‐level scoped styles if needed */
</style>

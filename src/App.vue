<!-- src/App.vue -->
<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="10">
            <!-- Render our Board component here -->
            <Board />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Board from './components/Board.vue';

export default defineComponent({
  name: 'App',
  components: {
    Board,
  },
});
</script>

<style scoped>
/* (You can remove any previous styles you had for the card.) */
</style>

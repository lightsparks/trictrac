<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <!-- Top controls: roll button & current player -->
          <div class="top-controls">
            <v-btn
                color="primary"
                @click="rollDice"
                :disabled="!!dice"
            >
              Roll Dice
            </v-btn>
            <span class="current-player">
              Current Player: <strong>{{ currentPlayer }}</strong>
            </span>
          </div>

          <!-- Show dice faces & remaining pips -->
          <DiceDisplay
              :dice="dice"
              :remaining="remainingMoves"
          />

          <!-- Render the board below -->
          <Board />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDice } from './composables/useDice';
import DiceDisplay from './components/DiceDisplay.vue';
import Board from './components/Board.vue';

export default defineComponent({
  name: 'App',
  components: {
    DiceDisplay,
    Board,
  },
  setup() {
    const { dice, remainingMoves, currentPlayer, rollDice, switchPlayer } = useDice();
    return {
      dice,
      remainingMoves,
      currentPlayer,
      rollDice,
      switchPlayer,
    };
  },
});
</script>

<style scoped>
.top-controls {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.current-player {
  margin-left: 16px;
  font-size: 1.1rem;
}
</style>

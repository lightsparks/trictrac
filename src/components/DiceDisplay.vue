<!-- src/components/DiceDisplay.vue -->
<template>
  <div class="dice-container">
    <!-- If no dice rolled yet -->
    <div v-if="!dice">
      <span class="no-roll">No dice rolled</span>
    </div>

    <!-- When dice are rolled -->
    <div v-else class="rolled-section">
      <!-- Show two large squares with the die faces (numbers) -->
      <div class="die-face">
        {{ dice[0] }}
      </div>
      <div class="die-face">
        {{ dice[1] }}
      </div>

      <!-- Show remaining pips as small “chips” -->
      <div class="remaining-moves">
        <span
            v-for="(m, i) in remaining"
            :key="i"
            class="move-chip"
        >
          {{ m }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DiceDisplay',
  props: {
    dice: {
      type: Array as PropType<[number, number] | null>,
      required: true,
    },
    remaining: {
      type: Array as PropType<number[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.dice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

/* When no dice have been rolled yet */
.no-roll {
  font-style: italic;
  color: #666;
}

/* Container for when dice are present */
.rolled-section {
  display: flex;
  align-items: center;
}

/* Each die is a 48×48 px square with a border */
.die-face {
  width: 48px;
  height: 48px;
  border: 2px solid #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 8px;
  background-color: #fff;
  user-select: none;
}

/* Container for remaining moves (pips) */
.remaining-moves {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 12px;
}

/* Each pip‐chip is a small 24×24 px square with a border */
.move-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid #333;
  border-radius: 4px;
  margin-right: 4px;
  font-size: 0.75rem;
  background-color: #f5f5f5;
  user-select: none;
}
</style>


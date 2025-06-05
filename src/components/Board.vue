<!-- src/components/Board.vue -->
<template>
  <div class="board-container">
    <!-- Top half: points 13–24 (left to right; we’ll display 12 boxes as placeholders) -->
    <div class="points-row top-row">
      <div
          v-for="point in 12"
          :key="point"
          class="point-placeholder"
      >
        {{ 13 + (12 - point) }}
      </div>
    </div>

    <!-- Middle bar (optional visual separator) -->
    <div class="middle-bar">
      <span>BAR</span>
    </div>

    <!-- Bottom half: points 12–1 (left to right) -->
    <div class="points-row bottom-row">
      <div
          v-for="point in 12"
          :key="point"
          class="point-placeholder"
      >
        {{ point }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Board',
  setup() {
    // In future, we’ll track which checkers live on each point here
    return {};
  },
});
</script>

<style scoped>
/*
  .board-container: wraps entire board
  We’re using CSS Grid here to stack three rows:
    1) top‐points row
    2) a middle “bar”
    3) bottom‐points row
*/
.board-container {
  display: grid;
  grid-template-rows: auto 30px auto;
  row-gap: 8px;
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}

/* Both .points-row (top & bottom) use a 12‐column grid */
.points-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 4px;
}

/* A simple placeholder box for each “point” */
.point-placeholder {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 0.75rem;
  color: #555;
  position: relative;
}

/* Label each placeholder with its numeric index at the bottom */
.point-placeholder::after {
  content: attr(data-index);
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 0.6rem;
  color: #999;
}

/* Middle bar separator */
.middle-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  font-weight: bold;
  color: #333;
}
</style>

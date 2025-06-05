<!-- src/components/Board.vue -->
<template>
  <div class="board-container">
    <!-- Top row: points 24 down to 13 -->
    <div class="points-row top-row">
      <!-- 24, 23, …, 13 -->
      <Point
          v-for="n in 12"
          :key="n"
          :index="24 - (n - 1)"
          :color="(n % 2 === 1) ? 'dark' : 'light'"
          :isTop="true"
      />
    </div>

    <!-- Middle bar -->
    <div class="middle-bar">
      <span>BAR</span>
    </div>

    <!-- Bottom row: points 1 up to 12 -->
    <div class="points-row bottom-row">
      <!-- 1, 2, …, 12 -->
      <Point
          v-for="n in 12"
          :key="n"
          :index="n"
          :color="(n % 2 === 1) ? 'light' : 'dark'"
          :isTop="false"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import Point from './Point.vue';

export default defineComponent({
  name: 'Board',
  components: {Point},
  setup() {
    // In future, we’ll track which checkers live on each point here
    return {};
  },
});
</script>

<style scoped>
/* Board.vue scoped style */
.board-container {
  display: grid;
  /* Three rows: top points / bar / bottom points */
  /* “auto” lets each row grow to fit its children (the triangles define their own height) */
  grid-template-rows: auto 30px auto;
  row-gap: 8px;

  /* Padding around the board; let it fill whatever parent width is available */
  padding: 16px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  /* Background + border to look like a backgammon board frame */
  background-color: #f5deb3;   /* wheat color */
  border: 2px solid #8d6e63;   /* brown border */
  border-radius: 8px;
}

/* Each “points-row” is 12 equal‐width columns (one column per triangle) */
.points-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 4px;
}

/* The “BAR” strip in the middle is a fixed 30px height (from the grid‐row) */
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


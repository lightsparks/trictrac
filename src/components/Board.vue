<template>
  <div class="board-wrapper">
    <!-- === Black’s Bar (top of the board) === -->
    <div class="bar-zone bar-black">
      <Checker color="black" :count="15"/>
    </div>

    <!-- === The 24‐point Board === -->
    <div class="board-container">
      <!-- Top row: points 24 → 13 -->
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

      <!-- Middle bar label (spacer) -->
      <div class="middle-bar">
        <span>BAR</span>
      </div>

      <!-- Bottom row: points 1 → 12 -->
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

    <!-- === White’s Bar (bottom of the board) === -->
    <div class="bar-zone bar-white">
      <Checker color="white" :count="15"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Point from './Point.vue';
import Checker from './Checker.vue';

export default defineComponent({
  name: 'Board',
  components: {Point, Checker},
});
</script>

<style scoped>
/*
  .board-wrapper holds the two bars (top & bottom) plus the main board.
  We use flex-direction: column so everything stacks vertically.
*/
.board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* If you want some spacing between bars & board, you can adjust below */
  gap: 16px;
  width: 100%;
}

/*
  bar-zone: Each bar is a small container “above” or “below” the board.
  We give it a fixed height that’s equal to Checker’s total height (84px),
  plus we center the Checker horizontally.
*/
.bar-zone {
  position: relative;
  width: 100%;
  height: 100px; /* 84px for stack + a bit of breathing room */
  display: flex;
  justify-content: center;
}

/* Color the bar’s background differently if you like */
.bar-black {
  background-color: #eeeeee;
}

.bar-white {
  background-color: #ffffff;
}

/* === Existing board‐container styles === */
.board-container {
  display: grid;
  grid-template-rows: auto 30px auto;
  row-gap: 8px;
  padding: 16px;
  width: 100%;
  max-width: 100%;
  background-color: #f5deb3;
  border: 2px solid #8d6e63;
  border-radius: 8px;
}

.points-row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 4px;
}

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

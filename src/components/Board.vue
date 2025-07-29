<template>
  <div class="board-wrapper">
    <!-- Black’s bar (top) -->
    <div class="bar-zone bar-black">
      <Checker color="black" :count="boardState.bar.black" />
    </div>

    <!-- Main board container -->
    <div class="board-container">
      <!-- Top row split into two halves + fold bar -->
      <div class="points-row top-row">
        <!-- Left half: points 24 → 19 -->
        <div class="points-half left">
          <Point
              v-for="n in 6"
              :key="n"
              :index="24 - (n - 1)"
              :color="(n % 2 === 1) ? 'dark' : 'light'"
              :isTop="true"
          >
            <Checker
                v-if="boardState.points[24 - (n - 1)].count > 0"
                :color="boardState.points[24 - (n - 1)].color!"
                :count="boardState.points[24 - (n - 1)].count"
            />
          </Point>
        </div>

        <!-- Vertical fold bar with 8px padding each side -->
        <div class="vertical-bar-wrapper">
          <div class="vertical-bar"></div>
        </div>

        <!-- Right half: points 18 → 13 -->
        <div class="points-half right">
          <Point
              v-for="n in 6"
              :key="n"
              :index="18 - (n - 1)"
              :color="(n % 2 === 1) ? 'light' : 'dark'"
              :isTop="true"
          >
            <Checker
                v-if="boardState.points[18 - (n - 1)].count > 0"
                :color="boardState.points[18 - (n - 1)].color!"
                :count="boardState.points[18 - (n - 1)].count"
            />
          </Point>
        </div>
      </div>

      <!-- Middle bar strip -->
      <div class="middle-bar">
        <span>BAR</span>
      </div>

      <!-- Bottom row -->
      <div class="points-row bottom-row">
        <!-- Left half: points 1 → 6 -->
        <div class="points-half left">
          <Point
              v-for="n in 6"
              :key="n"
              :index="n"
              :color="(n % 2 === 1) ? 'light' : 'dark'"
              :isTop="false"
          >
            <Checker
                v-if="boardState.points[n].count > 0"
                :color="boardState.points[n].color!"
                :count="boardState.points[n].count"
            />
          </Point>
        </div>

        <!-- Vertical fold bar -->
        <div class="vertical-bar-wrapper">
          <div class="vertical-bar"></div>
        </div>

        <!-- Right half: points 7 → 12 -->
        <div class="points-half right">
          <Point
              v-for="n in 6"
              :key="n"
              :index="n + 6"
              :color="(n % 2 === 1) ? 'dark' : 'light'"
              :isTop="false"
          >
            <Checker
                v-if="boardState.points[n + 6].count > 0"
                :color="boardState.points[n + 6].color!"
                :count="boardState.points[n + 6].count"
            />
          </Point>
        </div>
      </div>
    </div>

    <!-- White’s bar (bottom) -->
    <div class="bar-zone bar-white">
      <Checker color="white" :count="boardState.bar.white" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Point from './Point.vue';
import Checker from './Checker.vue';
import { useBoard } from '../composables/useBoard';

export default defineComponent({
  name: 'Board',
  components: { Point, Checker },
  setup() {
    const { boardState, enterFromBar } = useBoard();
    return { boardState, enterFromBar };
  },
});
</script>

<style scoped>
/* === Board Wrapper === */
.board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

/* === Bar Zones === */
.bar-zone {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
}
.bar-black {
  background-color: #eeeeee;
}
.bar-white {
  background-color: #ffffff;
}

/* === Main Board Container === */
.board-container {
  position: relative;
  display: grid;
  grid-template-rows: auto 30px auto;
  row-gap: 8px;
  padding: 16px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  background-color: #f5deb3;
  border: 2px solid #8d6e63;
  border-radius: 8px;
}

.board-container::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(50% - 2px);
  width: 6px;
  background-color: #8d6e63;
  z-index: 0;
}

.points-row {
  display: flex;
  align-items: stretch;
  width: 100%;
}

.points-half {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 4px;
  flex: 1;
}

.vertical-bar-wrapper {
  display: flex;
  align-items: stretch;
  padding: 0 8px;
}

.vertical-bar {
  width: 4px;
  background-color: #8d6e63;
  flex: 0 0 4px;
}

.points-half > * {
  position: relative;
  z-index: 2;
}

.middle-bar {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  border: 1px solid #ccc;
  font-weight: bold;
  color: #333;
}
</style>
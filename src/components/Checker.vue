<template>
  <div class="checker-stack">
    <!-- If count ≤ 5, render exactly `count` circles -->
    <template v-if="count <= 5">
      <div
          v-for="n in count"
          :key="n"
          class="checker-circle"
          :class="color"
          :style="{ bottom: `${(n - 1) * stackOffset}px` }"
      />
    </template>

    <!-- If count > 5, render 5 circles + an overflow label -->
    <template v-else>
      <div
          v-for="n in 5"
          :key="n"
          class="checker-circle"
          :class="color"
          :style="{ bottom: `${(n - 1) * stackOffset}px` }"
      />
      <div class="checker-overflow">
        +{{ count - 5 }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Checker',
  props: {
    /** 'white' or 'black', dictates circle fill */
    color: {
      type: String as () => 'white' | 'black',
      required: true,
    },
    /** How many total checkers to display (≥ 0) */
    count: {
      type: Number,
      required: true,
      validator: (v: number) => v >= 0,
    },
  },
  setup() {
    /**
     * stackOffset: vertical spacing (px) between stacked circles.
     * Each new circle is placed `stackOffset` px above the previous.
     * Adjust to taste—12 px works well for 24px‐diameter circles.
     */
    const stackOffset = 12;
    return { stackOffset };
  },
});
</script>

<style scoped>
/*
  The outer .checker-stack is position: relative so that
  .checker-circle (position: absolute) can stack at its bottom.
*/
.checker-stack {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /*
    width: 24px, height: enough to hold 5 circles + small overflow label
    (5 circles × 12px offset + 24px diameter = 84px).
  */
  width: 24px;
  height: 84px;
}

/*
  Each .checker-circle is a circle of 24×24 px,
  absolutely positioned relative to .checker-stack.
*/
.checker-circle {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #333;
}

/* Fill colors */
.checker-circle.black {
  background-color: #212121;
}
.checker-circle.white {
  background-color: #f5f5f5;
}

/* Overflow label when count > 5 */
.checker-overflow {
  position: absolute;
  bottom: 60px; /* above 5 circles (5 × 12px offset) */
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: bold;
  color: #333;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 4px;
  border-radius: 4px;
}
</style>

<!-- src/components/Point.vue -->
<template>
  <div
      class="point-wrapper"
      :class="[{ top: isTop }, colorClass, { highlight, selected }]"
      @click="$emit('click')"
  >
    <!-- Responsive triangle -->
    <div class="triangle-shape"></div>

    <!-- Checker slot (if a <Checker> is inserted) -->
    <slot />

    <!-- Pip label -->
    <span class="pip-label">{{ index }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, type PropType} from 'vue';

export default defineComponent({
  name: 'Point',
  props: {
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    color: {
      type: String as () => 'dark' | 'light',
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    isTop: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const colorClass = computed(() => {
      return props.color === 'dark' ? 'point-dark' : 'point-light';
    });
    return { colorClass };
  },
});
</script>


<style scoped>
/*
  .point-wrapper: holds one triangle, any checkers, and the pip label.
  We use padding‐top: 200% so that height = 2 × width.
  That matches a 2:1 triangle (just like border‐based 6rem tall when 3rem wide).
*/
.point-wrapper {
  position: relative;
  width: 100%;
  /* 200% of its own width → makes a 2:1 aspect ratio */
  padding-top: 200%;
  margin-bottom: 1.2rem; /* space for pip label */
  cursor: pointer;
}

/* Flip the triangle vertically when isTop === true */
.point-wrapper.top .triangle-shape {
  transform: rotate(180deg);
}

/*
  .triangle-shape: clips a 100%×100% square into an isosceles triangle.
  Because .point-wrapper’s height is exactly 2× its width, this yields
  a proper tall triangle that always fills its entire 1/12th column.
*/
.triangle-shape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  transition: background-color 0.2s ease-in-out;
}

/* Dark‐fill triangle */
.point-dark .triangle-shape {
  background-color: #607d8b;
}

/* Light‐fill triangle */
.point-light .triangle-shape {
  background-color: #cfd8dc;
}

/* Highlighted destination (semi‐transparent yellow) */
.highlight .triangle-shape {
  background-color: rgba(255, 235, 59, 0.6);
}

/* Selected source: bring forward and add a yellow outline */
.selected {
  z-index: 2;
}
.selected .triangle-shape {
  outline: 2px solid #ffeb3b;
  outline-offset: -2px;
}

/* Pip label at the bottom center (for bottom‐row points) */
.pip-label {
  position: absolute;
  bottom: -1rem;               /* 1rem below the triangle base */
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: #37474f;
  user-select: none;
}

/* Pip label above the apex (for top‐row points) */
.top .pip-label {
  bottom: auto;
  top: -1rem;
}
</style>
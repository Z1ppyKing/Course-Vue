<template>
  <div class="toggle-row">
    <button
      class="toggle-button"
      :class="isDark ? 'dark' : 'light'"
      @click="toggleTheme"
    >
      <div class="toggle-slider" :class="isDark ? 'right' : 'left'">
        <svg v-if="!isDark" class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        </svg>
        <svg v-else class="icon" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
      <div class="icon-inactive left" :class="isDark ? 'visible' : 'hidden'">
        <svg class="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        </svg>
      </div>
      <div class="icon-inactive right" :class="isDark ? 'hidden' : 'visible'">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits("themeevent");

const isDark = ref(props.isDark);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  // Випускаємо подію
  emit("themeevent", isDark.value);
};

// Спостерігаємо за змінами в props
watch(
  () => props.isDark,
  () => {
    isDark.value = props.isDark;
  }
);
</script>

<style>
.toggle-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-button {
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-button.light {
  background: #e5e7eb;
}

.toggle-button.dark {
  background: #1f2937;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
}

.toggle-slider.left {
  left: 2px;
}

.toggle-slider.right {
  left: 34px;
}

.icon {
  width: 14px;
  height: 14px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

.icon-inactive {
  position: absolute;
  top: 2px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.icon-inactive .icon {
  stroke: #9ca3af;
}

.icon-inactive.left {
  left: 2px;
}

.icon-inactive.right {
  right: 2px;
}

.hidden {
  opacity: 0;
}

.visible {
  opacity: 1;
}
</style>

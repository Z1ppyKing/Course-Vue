<template>
  <div id="main" :class="theme">
    <div class="theme-container">
      <ThemeToggle :is-dark="isDark" @themeevent="handleThemeChange" />
    </div>

    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/blogs">Blogs</router-link> |
      <router-link to="/contacts">Contacts</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide, computed } from "vue";
import ThemeToggle from "./components/ThemeToggle.vue";

const isDark = ref(false);

// Обробка зміни теми
const handleThemeChange = (newThemeValue) => {
  isDark.value = newThemeValue;
};

const theme = computed(() => (isDark.value ? "dark" : "light"));

// Забезпечуємо тему для всіх дочірніх компонентів
provide("theme", theme);
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  min-height: 100vh;
}

/* Контейнер для кнопки теми */
.theme-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

/* Стилі для світлої теми */
.light {
  background-color: #ffffff;
  color: #2c3e50;
}

/* Стилі для темної теми */
.dark {
  background-color: #1a1a1a;
  color: #ffffff;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: inherit;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

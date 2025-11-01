<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>{{ count }}</p>
    <button @click="increment">Збільшити</button>
  </div>
</template>

<script setup>
import { useCounter } from "@/composables/useCounter";

const { count, increment } = useCounter();
</script>

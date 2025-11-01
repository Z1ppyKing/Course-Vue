<template>
  <div class="hello">
    <h1>{{ props.msg }}</h1>
    <p>{{ count }}</p>
    <button @click="increment">Збільшити</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useCounter } from "@/composables/useCounter";

const props = defineProps({
  msg: String,
});

const { count, increment } = useCounter();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
  <div class="blog-post-detail">
    <h1>{{ postDetails?.title || "Пост не знайдено" }}</h1>

    <p>{{ postDetails?.body }}</p>

    <router-link to="/blogs">Назад до постів</router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

import { ref, onMounted } from "vue";

const route = useRoute();

const postId = Number(route.params.id);

const postDetails = ref();

//Отримання деталей постів

const fetchPostDetails = async () => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (!response.ok) throw new Error("Не вдалося отримати деталі");

    postDetails.value = await response.json();
  } catch (err) {
    alert("Помилка з'єднання!");
  }
};

onMounted(fetchPostDetails);
</script>

<style scoped>
.blog-post-detail {
  max-width: 48rem;

  margin: 0 auto;

  padding: 1.5rem;

  background: #fff;

  border-radius: 0.5rem;

  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;

  font-weight: bold;

  margin-bottom: 1rem;
}

p {
  font-size: 1rem;

  color: #4a5568;
}

a {
  display: inline-block;

  margin-top: 1rem;

  color: #3182ce;

  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>

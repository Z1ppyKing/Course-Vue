<template>
  <div class="blog-post-detail">
    <div v-if="loading" class="loading">Завантаження...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.body }}</p>
      <router-link to="/blogs">Назад до постів</router-link>
    </div>
    <div v-else>
      <h1>Пост не знайдено</h1>
      <router-link to="/blogs">Назад до постів</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchPost = async () => {
  try {
    loading.value = true;
    error.value = null;
    const postId = Number(route.params.id);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (!response.ok) {
      throw new Error("Не вдалося отримати пост");
    }

    const postData = await response.json();
    post.value = postData;
  } catch (err) {
    error.value = err.message;
    console.error("Помилка при завантаженні поста:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPost);
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
  line-height: 1.6;
  margin-bottom: 1rem;
}

a {
  display: inline-block;
  margin-top: 1rem;
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  font-size: 1.125rem;
  color: #718096;
  padding: 2rem;
}

.error {
  text-align: center;
  font-size: 1.125rem;
  color: #e53e3e;
  padding: 2rem;
  background: #fed7d7;
  border-radius: 0.375rem;
  border: 1px solid #feb2b2;
}
</style>

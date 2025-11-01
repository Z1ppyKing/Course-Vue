<template>
  <div class="blog-posts">
    <h2 class="blog-posts__title">Блоги</h2>

    <p v-if="loading" class="blog-posts__loading">Завантаження...</p>
    <Transition name="slide-fade">
      <p v-if="error" class="blog-posts__error">{{ error }}</p>
    </Transition>

    <!-- Пошук постів -->
    <Transition name="fade-scale">
      <div v-if="posts.length !== 0" class="blog-posts__search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Введіть заголовок для пошуку"
        />
      </div>
    </Transition>

    <!-- Список постів -->
    <div>
      <TransitionGroup name="list" class="blog-posts__list">
        <!-- Цикл по відфільтрованих постах -->
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="blog-posts__card"
        >
          <h3 class="blog-posts__card-title">
            <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
          </h3>
          <p class="blog-posts__card-content">{{ post.body }}</p>

          <!-- Кнопки управління постом -->
          <div class="blog-posts__button-group">
            <button
              class="blog-posts__button blog-posts__button--delete"
              @click="removePost(post.id)"
            >
              Видалити
            </button>
            <button
              class="blog-posts__button blog-posts__button--edit"
              @click="startEdit(post)"
            >
              Редагувати
            </button>
          </div>
          <Transition name="fade">
            <!-- Форма редагування (показується тільки для активного поста) -->
            <div
              v-if="editingPostId === post.id"
              class="blog-posts__edit-form-wrapper"
            >
              <form @submit.prevent="submitEdit(post.id)">
                <div>
                  <label>Заголовок:</label>
                  <input
                    v-model="editTitle"
                    type="text"
                    placeholder="Введіть заголовок"
                  />
                </div>
                <div>
                  <label>Контент:</label>
                  <textarea
                    v-model="editContent"
                    placeholder="Введіть контент"
                  ></textarea>
                </div>
                <div class="blog-posts__button-group">
                  <button
                    type="submit"
                    class="blog-posts__button blog-posts__button--save"
                  >
                    Зберегти
                  </button>
                  <button
                    class="blog-posts__button blog-posts__button--cancel"
                    @click="cancelEdit"
                  >
                    Скасувати
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </TransitionGroup>
    </div>

    <!-- Статистика та видалення всіх постів -->
    <p>Загальна кількість постів: {{ posts.length }}</p>
    <Transition name="fade-scale">
      <button
        v-if="posts.length !== 0"
        class="blog-posts__button blog-posts__button--delete"
        @click="removeAllPosts()"
      >
        Видалити всі пости
      </button>
    </Transition>

    <!-- Форма додавання нового поста -->
    <h3>Додати новий пост</h3>
    <form @submit.prevent="addNewPost">
      <div>
        <label>Заголовок:</label>
        <input
          v-model="newPostTitle"
          type="text"
          placeholder="Введіть заголовок"
        />
      </div>
      <div>
        <label>Контент:</label>
        <textarea
          v-model="newPostContent"
          placeholder="Введіть контент"
        ></textarea>
      </div>
      <button type="submit" class="blog-post__button blog-posts__button--add">
        Додати пост
      </button>
    </form>
  </div>
</template>

<script setup>
import "@/assets/styles/animations.css";
import { usePosts } from "@/composables/usePosts";
import { usePostForm } from "@/composables/usePostForm";

// Викликаємо usePosts() - отримуємо все для постів
const {
  posts,
  loading,
  error,
  searchQuery,
  filteredPosts,
  removeAllPosts,
  removePost,
} = usePosts();

// Викликаємо usePostForm(posts) - передаємо posts для мутації
const {
  newPostTitle,
  newPostContent,
  editingPostId,
  editTitle,
  editContent,
  addNewPost,
  startEdit,
  submitEdit,
  cancelEdit,
} = usePostForm(posts);
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
form > div {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
input,
textarea {
  width: 100%;
  max-width: 600px;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}
label {
  margin-bottom: 4px;
  font-weight: 500;
  align-self: flex-start;
}
.blog-posts {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.blog-posts__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.blog-posts__loading {
  font-size: 1rem;
  color: #718096;
  text-align: center;
}
.blog-posts__list {
  display: grid;
  gap: 1rem;
}
.blog-posts__card {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}
.blog-posts__card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.blog-posts__card-content {
  font-size: 1rem;
  color: #4a5568;
}
.blog-posts__button-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.blog-posts__button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
}
.blog-posts__button--delete {
  background: #e53e3e;
  color: #fff;
}
.blog-posts__button--delete:hover {
  background: #c53030;
}
.blog-posts__button--add {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #38a169;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}
.blog-posts__button--add:hover {
  background: #2f855a;
}
.blog-posts__button--edit {
  background: #3182ce;
  color: #fff;
}
.blog-posts__button--edit:hover {
  background: #225ea8;
}
.blog-posts__button--save {
  background: #38a169;
  color: #fff;
}
.blog-posts__button--save:hover {
  background: #2f855a;
}
.blog-posts__button--cancel {
  background: #a0aec0;
  color: #fff;
}
.blog-posts__button--cancel:hover {
  background: #718096;
}
.blog-posts__edit-form-wrapper {
  margin-top: 1rem;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
}
.blog-posts__search {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-posts__card-title a {
  color: #3182ce;
  text-decoration: none;
}
.blog-posts__card-title a:hover {
  text-decoration: underline;
}
</style>

import { ref } from "vue";

export function usePostForm(posts) {
  // Реактивні змінні для нового поста
  const newPostTitle = ref("");
  const newPostContent = ref("");

  // Реактивні змінні для редагування
  const editingPostId = ref(null); // ID поста, який редагується
  const editTitle = ref("");
  const editContent = ref("");

  // Додавання нового поста
  const addNewPost = () => {
    // Перевірка, що обидва поля заповнені
    if (newPostTitle.value && newPostContent.value) {
      posts.value.unshift({
        id: Date.now(),
        title: newPostTitle.value,
        body: newPostContent.value,
      });
      // Очищення полів після додавання
      newPostTitle.value = "";
      newPostContent.value = "";
    }
  };

  // Початок редагування поста
  function startEdit(post) {
    editingPostId.value = post.id;
    editTitle.value = post.title;
    editContent.value = post.body;
  }

  // Збереження змін при редагуванні
  function submitEdit(postId) {
    if (editTitle.value && editContent.value) {
      const post = posts.value.find((p) => p.id === postId);
      if (post) {
        post.title = editTitle.value;
        post.body = editContent.value;
      }
      cancelEdit(); // Закрити форму після збереження
    }
  }

  // Скасування редагування
  function cancelEdit() {
    editingPostId.value = null;
    editTitle.value = "";
    editContent.value = "";
  }

  // Повертаємо все для шаблону та подій
  return {
    newPostTitle,
    newPostContent,
    editingPostId,
    editTitle,
    editContent,
    addNewPost,
    startEdit,
    submitEdit,
    cancelEdit,
  };
}

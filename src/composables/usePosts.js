import { ref, computed, onMounted } from "vue";

export function usePosts() {
  // Масив постів
  const posts = ref([]);

  // Реактивні змінні для API call повідомлень
  const loading = ref(true);
  const error = ref(null);

  // Змінна для пошуку
  const searchQuery = ref("");

  // Отримання постів
  const fetchPost = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) throw new Error("Не вдалося отримати пости");
      const allPosts = await response.json();
      // Імітація затримки, як при довгому запиті до API
      setTimeout(() => {
        posts.value = allPosts.slice(0, 4); // Відображаємо тільки перші 4 пости
        loading.value = false;
      }, 1000);
    } catch (err) {
      loading.value = false;
      error.value = err.message;
    }
  };

  onMounted(fetchPost);

  // Обчислювана властивість для фільтрації постів
  const filteredPosts = computed(() => {
    return posts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  // Видалення всіх постів
  const removeAllPosts = () => {
    posts.value = [];
  };

  // Видалення поста
  const removePost = (postId) => {
    posts.value = posts.value.filter((post) => post.id !== postId);
  };

  // Повертаємо все, що потрібно компоненту
  return {
    posts,
    loading,
    error,
    searchQuery,
    filteredPosts,
    removeAllPosts,
    removePost,
  };
}

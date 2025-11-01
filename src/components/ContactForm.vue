<template>
  <div class="contact-form">
    <h2 class="contact-form__title">Контактна форма</h2>

    <!-- Поле для імені -->
    <div class="contact-form__field">
      <label class="contact-form__label">Ім'я (localStorage)</label>
      <input
        v-model="name"
        type="text"
        class="contact-form__input"
        placeholder="Введіть ваше ім'я"
        v-autofocus
        v-uppercase
        v-highlight
      />
    </div>
    <!-- Поле для email -->
    <div class="contact-form__field">
      <label class="contact-form__label">Email (cookies)</label>
      <input
        v-model="email"
        type="email"
        class="contact-form__input"
        placeholder="Введіть ваш email"
      />
    </div>
    <!-- Поле для телефону -->
    <div class="contact-form__field">
      <label class="contact-form__label">Телефон (sessionStorage)</label>
      <input
        v-model="phone"
        type="tel"
        maxlength="13"
        class="contact-form__input"
        placeholder="Введіть ваш телефон в форматі +380xxxxxxxxx"
        v-ukrphone
      />
    </div>

    <!-- Статус форми (реактивний текст) -->
    <p class="contact-form__status">{{ formStatus }}</p>

    <!-- Кнопка надсилання форми -->
    <button @click="validateForm" class="contact-form__button">
      Надіслати
    </button>
    <button @click="clearForm" class="contact-form__button">Очистити</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

// Реактивні змінні для полів форми
const name = ref("");
const email = ref("");
const phone = ref("");

// Watchers для автоматичного збереження при зміні полів
watch(name, () => {
  saveNameToLocalStorage();
});

watch(email, () => {
  saveEmailToCookies();
});

watch(phone, () => {
  savePhoneToSessionStorage();
});

// Методи для збереження данних в різних сховищах
const saveNameToLocalStorage = () => {
  localStorage.setItem("contactFormName", name.value);
};

const saveEmailToCookies = () => {
  setCookie("contactFormEmail", email.value, 30); // Зберігаємо на 30 днів
};

const savePhoneToSessionStorage = () => {
  sessionStorage.setItem("contactFormPhone", phone.value);
};

// Завантаження данних з різних сховищ
const loadFormData = () => {
  // Завантажуємо name з localStorage
  const savedName = localStorage.getItem("contactFormName");
  if (savedName) {
    name.value = savedName;
  }

  // Завантажуємо email з cookies
  const savedEmail = getCookie("contactFormEmail");
  if (savedEmail) {
    email.value = savedEmail;
  }

  // Завантажуємо phone з sessionStorage
  const savedPhone = sessionStorage.getItem("contactFormPhone");
  if (savedPhone) {
    phone.value = savedPhone;
  }
};

// Методи для роботи з cookies
const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Метод для перевірки форми
const validateForm = () => {
  if (!name.value || !email.value || !phone.value) {
    alert("Будь ласка, заповніть усі поля!");
    return;
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
    alert("Введіть коректну email-адресу!");
    return;
  }
  if (!/^\+380\d{9}$/.test(phone.value)) {
    alert("Введіть коректний номер телефону!");
    return;
  }
  alert("Форма успішно надіслана!");
};

//Метод очистки форми
const clearForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";

  // Очіщуємо всі сховища
  localStorage.removeItem("contactFormName");
  deleteCookie("contactFormEmail");
  sessionStorage.removeItem("contactFormPhone");
};

// Обчислювальна властивість для статусу форми
const formStatus = computed(() => {
  if (!name.value || !email.value || !phone.value) {
    return "Заповніть усі поля";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
    return "Некоректний email";
  }
  if (!/^\+380\d{9}$/.test(phone.value)) {
    return "Некоректний номер телефону!";
  }
  return "Форма готова для відправки";
});

onMounted(loadFormData);
</script>

<style>
.contact-form {
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.contact-form__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.contact-form__field {
  margin-bottom: 1rem;
}
.contact-form__label {
  display: block;
  color: #4a5568;
  margin-bottom: 0.25rem;
}
.contact-form__input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 1rem;
}
.contact-form__status {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
}
.contact-form__button {
  background: #3b82f6;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background 0.2s;
  border: none;
  cursor: pointer;

  margin: 10px;
}
.contact-form__button:hover {
  background: #2563eb;
}
</style>

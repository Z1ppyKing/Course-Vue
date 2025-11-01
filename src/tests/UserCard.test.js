import { mount } from "@vue/test-utils";
import { describe, test, expect } from "@jest/globals";
import UserCard from "../components/UserCard.vue";

describe("UserCard", () => {
  // Тест 1: Чи рендериться ім'я та прізвище з пропсу?
  test("Рендерить ім'я та прізвище", () => {
    const wrapper = mount(UserCard, {
      props: {
        name: "Іван",
      },
    });

    expect(wrapper.find("h2").text()).toBe("Іван");
  });

  // Тест 2: Чи рендериться вік та улюблений колір?
  test("Рендерить вік та улюблений колір", () => {
    const wrapper = mount(UserCard, {
      props: {
        age: 17,
        favoriteColor: "зелений",
      },
    });

    const paragraphs = wrapper.findAll("p");
    expect(paragraphs[0].text()).toBe("Вік: 17 років");
    expect(paragraphs[1].text()).toBe("Улюблений колір: зелений");
  });

  // Тест 3: Дефолтні пропси (якщо нічого не передано)
  test("Використовує дефолтні пропси", () => {
    const wrapper = mount(UserCard);

    expect(wrapper.find("h2").text()).toBe("Анонім");
    expect(wrapper.findAll("p")[0].text()).toBe("Вік: 18 років");
    expect(wrapper.findAll("p")[1].text()).toBe("Улюблений колір: синій");
  });

  // Тест 4: Чи рендериться фото з правильним src?
  test("Рендерить фото з пропсу src", () => {
    const wrapper = mount(UserCard, {
      props: {
        photo: "https://www.example.com/test-photo.jpg",
      },
    });

    expect(wrapper.find("img").attributes("src")).toBe(
      "https://www.example.com/test-photo.jpg"
    );
  });

  // Тест 5: Чи є клас для стилів?
  test("Має клас user-card", () => {
    const wrapper = mount(UserCard);

    expect(wrapper.find(".user-card").exists()).toBe(true);
  });

  // Тест 6: Клік на кнопку "Зв'язатися" - випускає подію contact
  test("Випускає подію contact при кліку на кнопку 'Зв'язатися'", async () => {
    const wrapper = mount(UserCard, {
      props: {
        name: "Іван",
        age: 25,
      },
    });

    await wrapper.findAll("button")[0].trigger("click");

    // Перевіряємо чи подія випущена з правильними даними
    const emitted = wrapper.emitted("contact");
    expect(emitted).toBeTruthy();
    expect(emitted[0]).toEqual(["Іван", 25]);
  });

  // Тест 7: Клік на кнопку "Показати улюблений колір" - випускає подію color
  test("Випускає подію color при кліку на кнопку 'Показати улюблений колір'", async () => {
    const wrapper = mount(UserCard, {
      props: {
        favoriteColor: "червоний",
      },
    });

    await wrapper.findAll("button")[1].trigger("click");

    // Перевіряємо чи подія випущена з правильними даними
    const emitted = wrapper.emitted("color");
    expect(emitted).toBeTruthy();
    expect(emitted[0]).toEqual(["червоний"]);
  });
});

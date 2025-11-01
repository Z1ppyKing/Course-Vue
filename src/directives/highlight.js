export const highlight = {
  mounted(el) {
    // Зберігаємо оригінальний фон
    const originalBg = el.style.backgroundColor || "";

    // Функція наведення
    const handleMouseEnter = () => {
      el.style.backgroundColor = "yellow";
    };

    // Функція виходу
    const handleMouseLeave = () => {
      el.style.backgroundColor = originalBg;
    };

    // Додаємо слухачі подій
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    // Зберігаємо функціі на елементі для очищення при unmounted
    el._highlightHandlers = { handleMouseEnter, handleMouseLeave };
    console.log(el._highlightHandlers);
  },
  onUnmounted(el) {
    const { handleMouseEnter, handleMouseLeave } = el._highlightHandlers || {};
    if (handleMouseEnter)
      el.removeEventListener("mouseenter", handleMouseEnter);
    if (handleMouseLeave)
      el.removeEventListener("mouseleave", handleMouseLeave);
    delete el._highlightHandlers;
  },
};

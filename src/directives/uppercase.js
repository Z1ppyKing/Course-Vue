export const uppercase = {
  mounted(el) {
    if (el.tagName === "INPUT") {
      el.value = el.value.toUpperCase();
    }
  },
  updated(el) {
    if (el.tagName === "INPUT") {
      el.value = el.value.toUpperCase();
    }
  },
};

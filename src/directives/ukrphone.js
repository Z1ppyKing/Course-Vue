export const ukrphone = {
  mounted(el) {
    if (el.tagName === "INPUT" || el.getAttribute("type") === "tel") {
      el.value = el.value + "+380";
    }
  },
};

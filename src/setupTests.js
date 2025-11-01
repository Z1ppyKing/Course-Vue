import { config } from "@vue/test-utils";

// Базова конфігурація для тестів
config.global.stubs = {
  transition: true,
};

// src/tests/setup.ts
import { beforeEach } from "vitest";
import { createPinia, type Pinia } from "pinia";
import { createRouter, createMemoryHistory, type Router } from "vue-router";
import { routes } from "@/router";

export let pinia: Pinia;
export let testRouter: Router;

export function createTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes,
  });
}

beforeEach(async () => {
  pinia = createPinia();
  testRouter = createTestRouter();

  await testRouter.push("/");
  await testRouter.isReady();
});

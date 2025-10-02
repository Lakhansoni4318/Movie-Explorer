import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { pinia, testRouter } from "./setup";

async function mountApp() {
  const wrapper = mount(App, {
    global: { plugins: [pinia, testRouter] },
  });
  await testRouter.isReady();
  return wrapper;
}

describe("Vue Router Navigation", () => {
  it("renders Home page by default", async () => {
    const wrapper = await mountApp();
    expect(wrapper.html()).toContain("Popular Movies");
  });

  it("navigates to MovieDetails page with id", async () => {
    await testRouter.push({ name: "MovieDetails", params: { id: "123" } });
    expect(testRouter.currentRoute.value.name).toBe("MovieDetails");
    expect(testRouter.currentRoute.value.params.id).toBe("123");
  });

  it("navigates to Favorites page", async () => {
    await testRouter.push("/favorites");
    expect(testRouter.currentRoute.value.name).toBe("Favorites");
  });

  it("unknown route redirects to NotFound", async () => {
    await testRouter.push("/unknown-path");
    expect(testRouter.currentRoute.value.name).toBe("NotFound");
  });
});

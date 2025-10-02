import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import SearchForm from "@/components/SearchBar.vue";
import { useMoviesStore } from "@/stores/movies";

let moviesStore: ReturnType<typeof useMoviesStore>;

beforeEach(() => {
  setActivePinia(createPinia());
  moviesStore = useMoviesStore();

  moviesStore.searchMovies = vi.fn().mockResolvedValue([{ id: 1, title: "Inception" }]);
});

function mountSearchForm() {
  return mount(SearchForm, { props: { genres: [] } });
}

describe("SearchForm.vue", () => {
  it("shows error if search query is empty", async () => {
    const wrapper = mountSearchForm();
    await wrapper.find('[data-testid="search-input"]').setValue("");
    await wrapper.find('[data-testid="search-btn"]').trigger("click");

    expect(wrapper.text()).toContain("Movie name is required.");
  });

  it("calls store and emits onSearch when search query is valid", async () => {
    const wrapper = mountSearchForm();
    await wrapper.find('[data-testid="search-input"]').setValue("Inception");
    await wrapper.find('[data-testid="search-btn"]').trigger("click");

    expect(moviesStore.searchMovies).toHaveBeenCalled();
    expect(wrapper.emitted()).toHaveProperty("onSearch");
    expect(wrapper.emitted("onSearch")?.[0]?.[0]).toEqual([{ id: 1, title: "Inception" }]);
  });

  it("clears input and emits callPopularMovie on clear", async () => {
    const wrapper = mountSearchForm();
    await wrapper.find('[data-testid="search-input"]').setValue("Test Movie");
    await wrapper.find('[data-testid="clear-btn"]').trigger("click");

    const inputValue = (wrapper.find('[data-testid="search-input"]').element as HTMLInputElement).value;
    expect(inputValue).toBe("");
    expect(wrapper.emitted()).toHaveProperty("callPopularMovie");
  });
});

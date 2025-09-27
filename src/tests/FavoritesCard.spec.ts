import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import MovieCard from "@/components/MovieCard.vue";
import { createPinia, setActivePinia } from "pinia";
import { useFavoritesStore } from "@/stores/favorites";
import { toast } from "vue3-toastify";
import { nextTick } from "vue";

vi.mock("vue3-toastify", () => ({
  toast: { success: vi.fn(), info: vi.fn() },
}));

const mockPush = vi.fn();
let store: ReturnType<typeof useFavoritesStore>;

const movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "test.jpg",
  overview: "Some overview text for testing.",
  release_date: "2025-01-01",
  vote_average: 8,
  notes: "",
  rating: 0,
};

async function mountMovieCard(routeName = "Home") {
  const wrapper = mount(MovieCard, {
    props: { movie },
    global: {
      mocks: {
        $router: { push: mockPush },
        $route: { name: routeName },
      },
    },
  });
  (wrapper.vm as any).loaded = true;
  await nextTick();
  return wrapper;
}

describe("MovieCard.vue Favorites functionality", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useFavoritesStore();
    store.favorites = [];
    vi.clearAllMocks();
  });

  it("adds a movie to favorites", async () => {
    const wrapper = await mountMovieCard();

    await wrapper.find('[data-testid="favorite-button"]').trigger("click");
    await wrapper.find('[data-testid="modal-confirm-button"]').trigger("click");

    expect(store.favorites).toHaveLength(1);
    expect(store.favorites[0].id).toBe(movie.id);
    expect(toast.success).toHaveBeenCalledWith("Movie added to favorites");
    expect((wrapper.vm as any).showFavModal).toBe(false);
  });

  it("removes a movie from favorites", async () => {
    store.addFavorite(movie);
    const wrapper = await mountMovieCard();

    await wrapper.find('[data-testid="favorite-button"]').trigger("click");
    expect((wrapper.vm as any).modalAction).toBe("remove");

    await wrapper.find('[data-testid="modal-confirm-button"]').trigger("click");

    expect(store.favorites).toHaveLength(0);
    expect(toast.info).toHaveBeenCalledWith("Movie removed from favorites");
    expect((wrapper.vm as any).showFavModal).toBe(false);
  });
});

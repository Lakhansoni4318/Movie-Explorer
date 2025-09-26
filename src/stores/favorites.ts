import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as any[],
  }),

  actions: {
    addFavorite(movie: any) {
      if (!this.favorites.find((m: any) => m.id === movie.id)) {
        this.favorites.push(movie);
      }
    },
    removeFavorite(id: number) {
      this.favorites = this.favorites.filter((m) => m.id !== id);
    },
    isFavorite(id: number) {
      return this.favorites.some((m) => m.id === id);
    },
  },

  persist: {
    key: "my-favorites",
    storage: localStorage,
  },
});

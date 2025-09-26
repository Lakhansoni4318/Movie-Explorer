import { defineStore } from "pinia";

export const useGenresStore = defineStore("genres", {
  state: () => ({
    genres: [] as { id: number; name: string }[],
  }),

  actions: {
    setGenres(genres: { id: number; name: string }[]) {
      this.genres = genres;
    },
  },
    persist: {
    key: "my-genres",
    storage: localStorage, // optional
  },
});

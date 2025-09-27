import { defineStore } from "pinia";
import ApiService from "@/api/apiService";
import { setCache, getCache, deleteCache } from "@/composables/useIndexedDbCache";

interface SearchParams {
  query: string;
  year?: string;
  with_genres?: string;
  page?: string;
}

const CACHE_TTL = 24 * 60 * 60 * 1000; 

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    results: [] as any[],
    loading: false,
    error: null as string | null,
    cache: new Map<string, any[]>(),
  }),

  actions: {
    async searchMovies(params: SearchParams) {
      const queryKey = JSON.stringify(params);

      if (this.cache.has(queryKey)) {
        this.results = this.cache.get(queryKey)!;
        return this.results;
      }

      const cached = await getCache<any[]>(queryKey);
      if (cached) {
        if (Date.now() - cached.timestamp < CACHE_TTL) {
          this.results = cached.data;
          this.cache.set(queryKey, cached.data);
          return cached.data;
        } else {
          await deleteCache(queryKey);
        }
      }

      this.loading = true;
      this.error = null;

      try {
        const { data } = await ApiService.searchMovies(params);
        this.results = data;

        this.cache.set(queryKey, data);
        await setCache(queryKey, data);

        return data;
      } catch (err) {
        this.error = "Failed to fetch movies.";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

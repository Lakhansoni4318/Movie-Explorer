<template>
  <div>
    <HeroSection />

    <SearchBar ref="searchRef" :genres="genres" @callPopularMovie="fetchPopularMovies" @onSearch="handleSearch" />

    <h2 class="text-2xl font-bold mb-4">Popular Movies</h2>

    <MovieGrid
      :genredata="genres"
      :moviesData="moviesData"
      @loadMore="handleLoadMore"
    />

    <div v-if="!moviesData?.results?.length">
      <NoMovies @showPopular="fetchPopularMovies" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import HeroSection from "@/components/HeroSection.vue";
import SearchBar from "@/components/SearchBar.vue";
import MovieGrid from "@/components/MovieGrid.vue";
import NoMovies from "@/components/NoMovies.vue";
import ApiService from "@/api/apiService.ts";
import { useGenresStore } from "@/stores/useGenresStore";

const moviesData = ref(null);
const genres = ref([]);
const isSearch = ref(false);
const searchRef = ref(null);
const genresStore = useGenresStore();
const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
});

function handleSearch(payload) {
  isSearch.value = true;
  moviesData.value = payload;
  pagination.currentPage = payload.page || 1;
  pagination.totalPages = payload.total_pages || 1;
}

async function fetchGenres() {
  try {
    const { data } = await ApiService.fetchGenres();
    genres.value = data.genres || [];
    genresStore.setGenres(data.genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}

async function fetchPopularMovies(page = 1) {
  try {
    isSearch.value = false;
    const { data } = await ApiService.popularMovies(page);

    moviesData.value =
      page === 1
        ? data
        : {
            ...moviesData.value,
            results: [...(moviesData.value?.results || []), ...data.results],
          };

    pagination.currentPage = data.page;
    pagination.totalPages = data.total_pages;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

function handleLoadMore() {
  if (isSearch.value) {
    searchRef.value?.onSearchClick();
  } else if (pagination.currentPage < pagination.totalPages) {
    fetchPopularMovies(pagination.currentPage + 1);
  }
}

onMounted(() => {
  fetchPopularMovies();
  fetchGenres();
});
</script>

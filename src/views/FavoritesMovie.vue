<template>
  <section class="px-6 py-8">
    <h1 class="text-3xl font-bold text-purple-500 mb-6">Your Favorites</h1>

    <p v-if="!isOnline" class="text-yellow-400 mb-4">
      ⚠ You are offline. Favorites are loaded from local storage.
    </p>

    <div v-if="favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <MovieCard
        v-for="m in favorites"
        :key="m.id"
        :movie="m"
         v-memo="[m.id, m.genreNames]"
        :genre-names="getGenreNames(m)"
      />
    </div>

    <div v-else class="text-gray-400 text-center mt-12">
      <p>You have not added any favorite movies yet.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useFavoritesStore } from "@/stores/favorites";
import { useGenresStore } from "@/stores/useGenresStore";
import MovieCard from "@/components/MovieCard.vue";

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const genresStore = useGenresStore();
const { genres } = storeToRefs(genresStore);

const getGenreNames = (movie: any) => {
  return genres.value
    .filter((g: any) => movie.genre_ids?.includes(g.id))
    .map((g: any) => g.name);
};

const isOnline = ref(navigator.onLine);
const updateOnlineStatus = () => (isOnline.value = navigator.onLine);

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});
</script>

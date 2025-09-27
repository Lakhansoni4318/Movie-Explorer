<template>
  <section class="px-6 py-8">
    <h1 class="text-3xl font-bold text-purple-500 mb-6">Your Favorites</h1>

    <!-- Offline warning -->
    <p v-if="!isOnline" class="text-yellow-400 mb-4">
      ⚠ You are offline. Favorites are loaded from local storage.
    </p>

    <!-- Favorite movies grid -->
    <div v-if="favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="m in favorites"
        :key="m.id"
        class="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        <!-- Movie Poster -->
        <img
          :src="`https://image.tmdb.org/t/p/w500${m.poster_path}`"
          :alt="m.title"
          class="w-full h-64 object-cover"
        />

        <!-- Movie Details -->
        <div class="p-4 space-y-2">
          <h2 class="text-xl font-semibold text-blue-400">{{ m.title }}</h2>
          <p class="text-gray-300 italic text-sm" v-if="m.tagline">"{{ m.tagline }}"</p>

          <!-- Genres -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="g in getGenreNames(m)"
              :key="g"
              class="px-2 py-1 rounded-full bg-purple-700 text-xs text-white"
            >
              {{ g }}
            </span>
          </div>

          <!-- Notes & Rating (Only on /favorites page) -->
          <div v-if="showNotesAndRating(m)" class="mt-3 bg-gray-700 p-2 rounded-lg text-gray-200 text-sm space-y-1">
            <p v-if="m.notes"><strong>Notes:</strong> {{ m.notes }}</p>
            <p v-if="m.rating && m.rating > 0"><strong>Rating:</strong> ⭐ {{ m.rating }}/10</p>
          </div>
        </div>
      </div>
    </div>

    <!-- No favorites message -->
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
import { useRoute } from "vue-router";

const favoritesStore = useFavoritesStore();
const { favorites } = storeToRefs(favoritesStore);

const genresStore = useGenresStore();
const { genres } = storeToRefs(genresStore);

const getGenreNames = (movie: any) => {
  return genres.value
    .filter((g: any) => movie.genre_ids?.includes(g.id))
    .map((g: any) => g.name);
};

// Only show notes and rating on /favorites page
const route = useRoute();
const showNotesAndRating = (movie: any) => {
  return route.path === "/favorites" && (movie.notes || movie.rating > 0);
};

// Online/offline detection
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

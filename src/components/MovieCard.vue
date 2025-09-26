<template>
  <div
    class="w-96 h-auto mx-auto bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col relative mb-6 group"
  >
    <button
      @click="toggleFavorite"
      class="absolute top-3 right-3 p-2 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 z-10"
    >
      <HeartIcon
        :class="isFav ? 'w-5 h-5 text-red-500' : 'w-5 h-5 text-white'"
      />
    </button>
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      :alt="movie.title"
      class="w-full h-80 object-cover"
    />

    <div class="p-4 flex flex-col flex-1">
      <h2 class="text-2xl font-bold mb-2">{{ movie.title }}</h2>
      <p class="text-gray-400 text-sm mb-2">
        Release: {{ movie.release_date }} | Rating: {{ movie.vote_average }} ⭐
      </p>

      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="(genre, index) in genreNames"
          :key="index"
          class="bg-blue-600 px-2 py-1 rounded-full text-xs"
        >
          {{ genre }}
        </span>
      </div>

      <p class="text-gray-300 text-sm">
        <span v-if="!showMore">{{ shortOverview }}</span>
        <span v-else>{{ movie.overview }}</span>
      </p>

      <button
        v-if="movie.overview.length > 150"
        @click="showMore = !showMore"
        class="mt-2 text-indigo-400 text-sm font-semibold hover:underline self-start"
      >
        {{ showMore ? "Show Less" : "Show More" }}
      </button>
    </div>

    <div class="p-4">
      <button
      @click="movieDetails(movie.id)"
        class="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { HeartIcon } from "@heroicons/vue/24/solid";
import { useFavoritesStore } from "@/stores/favorites";
import apiService from "@/api/apiService";

const showMore = ref(false);

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
  genreNames: {
    type: Array,
    default: () => [],
  },
});

const favoritesStore = useFavoritesStore();

const isFav = computed(() => favoritesStore.isFavorite(props.movie.id));

function toggleFavorite() {
  if (isFav.value) {
    favoritesStore.removeFavorite(props.movie.id);
  } else {
    favoritesStore.addFavorite(props.movie);
  }
}

async function movieDetails(id:number){
  try {
    const { data } = await apiService.movieDetails(id);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

const shortOverview = computed(() => {
  return props.movie?.overview?.length > 150
    ? props.movie.overview.slice(0, 150) + "..."
    : props.movie.overview;
});
</script>

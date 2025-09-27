<template>
  <div
    class="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6"
    v-if="movie"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Side Poster -->
      <div class="flex justify-center">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="rounded-xl shadow-lg w-full max-w-sm object-cover transition-transform duration-700 ease-in-out hover:scale-105"
        />
      </div>

      <!-- Right Side Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title -->
        <h1 class="text-4xl font-bold text-blue-400">{{ movie.title }}</h1>
        <p class="italic text-lg text-blue-200" v-if="movie.tagline">
          "{{ movie.tagline }}"
        </p>

        <!-- Rating + Date + Runtime -->
        <div class="flex items-center gap-6 text-gray-300 text-sm">
          <span class="flex items-center gap-1"
            >⭐ {{ movie.vote_average.toFixed(1) }} ({{
              movie.vote_count.toLocaleString()
            }}
            votes)</span
          >
          <span
            >📅 {{ new Date(movie.release_date).toLocaleDateString() }}</span
          >
          <span
            >⏱ {{ Math.floor(movie.runtime / 60) }}h
            {{ movie.runtime % 60 }}m</span
          >
        </div>

        <!-- Genres -->
        <div class="flex gap-2">
          <span
            v-for="genre in movie.genres"
            :key="genre.id"
            class="px-3 py-1 rounded-full bg-purple-700 text-xs"
          >
            {{ genre.name }}
          </span>
        </div>

        <!-- Overview -->
        <div>
          <h2 class="text-2xl font-bold mb-2">Overview</h2>
          <p class="text-gray-300">{{ movie.overview }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
          <button
            v-if="trailerUrl"
            @click="openTrailer"
            class="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            ▶ Watch Trailer
          </button>
          <a
            :href="movie.homepage"
            target="_blank"
            class="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-lg font-medium"
          >
            🌐 Official Website
          </a>
        </div>

        <!-- Box Office -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-400 mb-2">Box Office</h3>
          <p>
            Budget:
            <span class="text-gray-300"
              >${{ movie.budget.toLocaleString() }}</span
            >
          </p>
          <p>
            Revenue:
            <span class="text-green-400 font-bold"
              >${{ movie.revenue.toLocaleString() }}</span
            >
          </p>
        </div>

        <!-- Production -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-400 mb-2">Production</h3>
          <ul class="list-disc ml-6 text-gray-300">
            <li v-for="company in movie.production_companies" :key="company.id">
              {{ company.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-else
    class="flex justify-center items-center min-h-screen text-gray-400"
  >
    Loading movie details...
  </div>
</template>

<script lang="ts" setup>
import apiService from "@/api/apiService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movieId = Number(route.params.id);
const trailerUrl = ref<string | null>(null);
const movie = ref<any>(null);

onMounted(() => {
  fetchMovieDetails(movieId);
});

async function fetchMovieDetails(id: number) {
  try {
    const { data } = await apiService.movieDetails(id);
    movie.value = data;

    const videosRes = await apiService.movieVideos(id);
    const trailers = videosRes.data.results.filter(
      (v: any) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailers.length > 0) {
      trailerUrl.value = `https://www.youtube.com/watch?v=${trailers[0].key}`;
    }
  } catch (error) {
    console.error("Failed to fetch movie details or trailer:", error);
  }
}

function openTrailer() {
  if (trailerUrl.value) {
    window.open(trailerUrl.value, "_blank");
  }
}
</script>

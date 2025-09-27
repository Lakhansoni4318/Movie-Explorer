<template>
  <!-- Error Handling -->
  <div v-if="error" class="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6">
    <div class="bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-md text-center animate-fadeIn">
      <div class="text-6xl mb-4">🎬</div>
      <h1 class="text-3xl font-bold text-red-400 mb-2">Oops!</h1>
      <p class="text-gray-300 mb-6">{{ error }}</p>
      <button
        @click="retryFetch"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
      >
        🔄 Retry
      </button>
      <button
        @click="goHome"
        class="mt-4 ms-4 bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
      >
        🏠 Go Home
      </button>
    </div>
  </div>

  <!-- Movie Details -->
  <div v-else-if="movie" class="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen p-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Side Poster -->
      <div class="flex justify-center">
        <div class="w-full max-w-sm rounded-xl overflow-hidden shadow-lg relative">
          <!-- Skeleton while loading -->
          <div
            v-if="loadingImage"
            class="animate-pulse bg-gray-700 w-full h-[400px] rounded-xl"
          ></div>

          <!-- Actual Image -->
          <img
            v-show="!loadingImage"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="rounded-xl shadow-lg w-full max-w-sm object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            @load="loadingImage = false"
          />
        </div>
      </div>

      <!-- Right Side Details -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Title -->
        <h1 class="text-4xl font-bold text-blue-400">{{ movie.title }}</h1>
        <p class="italic text-lg text-blue-200" v-if="movie.tagline">"{{ movie.tagline }}"</p>

        <!-- Rating + Date + Runtime -->
        <div class="flex items-center gap-6 text-gray-300 text-sm">
          <span class="flex items-center gap-1">
            ⭐ {{ movie.vote_average.toFixed(1) }} ({{ movie.vote_count.toLocaleString() }} votes)
          </span>
          <span>📅 {{ new Date(movie.release_date).toLocaleDateString() }}</span>
          <span>⏱ {{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}m</span>
        </div>

        <!-- Genres -->
        <div class="flex gap-2">
          <span
            v-for="genre in movie.genres"
            :key="genre.id"
            v-memo="[genre.id]"
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
            Budget: <span class="text-gray-300">${{ movie.budget.toLocaleString() }}</span>
          </p>
          <p>
            Revenue:
            <span class="text-green-400 font-bold">${{ movie.revenue.toLocaleString() }}</span>
          </p>
        </div>

        <!-- Production -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-400 mb-2">Production</h3>
          <ul class="list-disc ml-6 text-gray-300">
            <li v-for="company in movie.production_companies" v-memo="[company.id]" :key="company.id">
              {{ company.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex justify-center items-center min-h-screen text-gray-400">
    Loading movie details...
  </div>
</template>

<script lang="ts" setup>
import apiService from '@/api/apiService';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const movieId = Number(route.params.id);

const movie = ref<any>(null);
const trailerUrl = ref<string | null>(null);
const loadingImage = ref(true);
const error = ref<string | null>(null);

onMounted(() => {
  fetchMovieDetails(movieId);
});

async function fetchMovieDetails(id: number) {
  try {
    loadingImage.value = true;
    error.value = null;

    const { data } = await apiService.movieDetails(id);

    if (!data || !data.id) {
      error.value = 'Movie not found. Please check the ID.';
      movie.value = null;
      return;
    }

    movie.value = data;

    const videosRes = await apiService.movieVideos(id);
    const trailers = videosRes.data.results.filter(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    );

    trailerUrl.value =
      trailers.length > 0 ? `https://www.youtube.com/watch?v=${trailers[0].key}` : null;
  } catch (err) {
    console.error('Failed to fetch movie details or trailer:', err);
    error.value = 'Failed to fetch movie details. Please try again later.';
    movie.value = null;
  }
}

function openTrailer() {
  if (trailerUrl.value) {
    window.open(trailerUrl.value, '_blank');
  }
}

function retryFetch() {
  fetchMovieDetails(movieId);
}

function goHome() {
  router.push('/');
}
</script>

<style scoped>
/* Fade-in animation for error card */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>

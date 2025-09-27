<template>
  <div
    class="w-96 mx-auto bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col relative mb-6 group"
  >
    <button
      v-if="loaded"
      @click="toggleFavorite"
      class="absolute top-3 right-3 p-2 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 z-10"
    >
      <HeartIcon :class="isFav ? 'w-5 h-5 text-red-500' : 'w-5 h-5 text-white'" />
    </button>

    <div class="relative w-full h-80">
      <div
        v-if="!loaded"
        class="absolute inset-0 flex items-center justify-center bg-gray-700 animate-pulse rounded-t-xl"
      >
        <svg
          class="w-10 h-10 text-gray-500"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
      </div>

      <img
        loading="lazy"
        :src="currentSrc"
        :alt="movie.title"
        class="w-full h-full object-cover rounded-t-xl transition-opacity duration-700"
        :class="{ 'opacity-0': !loaded, 'opacity-100': loaded }"
        @load="onLoad"
        @error="onError"
      />
    </div>

    <div v-if="loaded" class="p-4 flex flex-col flex-1">
      <h2 class="text-2xl font-bold mb-1 truncate">{{ movie.title || 'Untitled Movie' }}</h2>
      <p class="text-gray-400 text-sm mb-3">
        Release: {{ movie.release_date || 'N/A' }} | Rating: {{ movie.vote_average ?? 'N/A' }} ⭐
      </p>

      <div
        v-if="$route.name === 'Favorites' && isFav && (movie.notes || movie.rating)"
        class="mb-3 p-3 bg-gray-800 rounded-lg border border-gray-700 text-sm"
      >
        <p v-if="movie.notes">📝 {{ movie.notes }}</p>

        <p v-if="movie.rating">⭐ Rating: {{ movie.rating }}/5</p>
      </div>

      <!-- Genres -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-for="(genre, index) in genreNames || []"
          :key="index"
          class="bg-blue-600 px-2 py-1 rounded-full text-xs"
        >
          {{ genre }}
        </span>
        <span v-if="!genreNames || genreNames.length === 0" class="text-gray-500 text-xs">
          No genres
        </span>
      </div>

      <!-- Overview -->
      <p class="text-gray-300 text-sm mb-2">
        <span v-if="!showMore">{{ shortOverview }}</span>
        <span v-else>{{ movie.overview || 'No overview available.' }}</span>
      </p>
      <button
        v-if="movie.overview?.length > 150"
        @click="showMore = !showMore"
        class="mt-1 text-indigo-400 text-sm font-semibold hover:underline self-start"
      >
        {{ showMore ? 'Show Less' : 'Show More' }}
      </button>
    </div>

    <!-- View Details Button -->
    <div v-if="loaded" class="p-4">
      <button
        @click="navigateToMovieDetails(movie.id)"
        class="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue';
import { HeartIcon } from '@heroicons/vue/24/solid';
import { useFavoritesStore } from '@/stores/favorites';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  notes: string;
  rating: number;
}

const showMore = ref(false);
const loaded: Ref<boolean> = ref(false);
const router = useRouter();
const showFavModal = ref(false);
const modalAction = ref<'add' | 'remove' | null>(null);
const note = ref('');
const rating = ref<number | null>(null);
let selectedMovie: Movie | null = null;

const props = defineProps<{
  movie: Movie;
  genreNames?: string[];
  showUserData?: boolean;
}>();

const favoritesStore = useFavoritesStore();
const isFav = computed(() => favoritesStore.isFavorite(props.movie.id));

function toggleFavorite() {
  selectedMovie = props.movie;
  if (isFav.value) {
    modalAction.value = 'remove';
    showFavModal.value = true;
  } else {
    modalAction.value = 'add';
    note.value = '';
    rating.value = null;
    showFavModal.value = true;
  }
}

function closeFavModal() {
  showFavModal.value = false;
  modalAction.value = null;
  selectedMovie = null;
  note.value = '';
  rating.value = null;
}

function confirmFavoriteAction() {
  if (!selectedMovie) return;

  if (modalAction.value === 'add') {
    favoritesStore.addFavorite({
      ...selectedMovie,
      notes: note.value || '',
      rating: rating.value || 0,
    });
    toast.success('Movie added to favorites');
  } else if (modalAction.value === 'remove') {
    favoritesStore.removeFavorite(selectedMovie.id);
    toast.info('Movie removed from favorites');
  }

  closeFavModal();
}

function navigateToMovieDetails(id: number) {
  router.push({ name: 'MovieDetails', params: { id } });
}

const shortOverview = computed(() => {
  return props.movie.overview.length > 150
    ? props.movie.overview.slice(0, 150) + '...'
    : props.movie.overview;
});

const placeholderImage = '/images/placeholder.svg';
const currentSrc: Ref<string> = ref(`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`);

function onLoad(): void {
  loaded.value = true;
}

function onError(): void {
  currentSrc.value = placeholderImage;
  loaded.value = true;
}

watch(
  () => props.movie.poster_path,
  (newPath) => {
    loaded.value = false;
    currentSrc.value = `https://image.tmdb.org/t/p/w500/${newPath}`;
  }
);
</script>

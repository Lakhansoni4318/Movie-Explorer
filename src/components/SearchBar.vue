<template>
  <div class="bg-gray-900 rounded-lg p-6 shadow-md mb-10">
    <!-- Search Input -->
    <div class="flex flex-col gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Enter movie title..."
        class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
      />

      <!-- Toggle Filters -->
      <div class="flex justify-between items-center">
        <button
          @click="toggleFilters"
          class="flex items-center text-sm text-gray-400 hover:text-gray-200"
        >
          <span class="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 
                       0 01-.293.707L15 13.414V19a1 1 0 
                       01-1.447.894l-4-2A1 1 0 
                       019 17v-3.586L3.293 6.707A1 1 
                       0 013 6V4z"
              />
            </svg>
          </span>
          {{ showFilters ? "Hide Advanced Filters" : "Show Advanced Filters" }}
        </button>
      </div>

      <!-- Advanced Filters -->
      <div v-if="showFilters" class="flex flex-col md:flex-row gap-4">
        <!-- Year -->
        <div class="flex-1">
          <label class="block text-gray-400 mb-1">Release Year</label>
          <select
            v-model="selectedYear"
            class="w-full h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Any year</option>
            <option v-for="year in releaseYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>

        <!-- Genre -->
        <div class="flex-1">
          <label class="block text-gray-400 mb-1">Genre</label>
          <select
            v-model="selectedGenre"
            class="w-full h-10 px-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-sm focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Any genre</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.name">
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Error -->
      <p v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </p>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
          @click="onSearchClick"
          class="flex-1 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
        >
          <span class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16l4-4m0 0l4-4m-4 4H3m13 0h5"
              />
            </svg>
            Search Movies
          </span>
        </button>

        <button
          @click="onClearClick"
          class="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import ApiService from "@/api/apiService";

interface Genre {
  id: number;
  name: string;
}

const props = defineProps<{
  genres: Genre[];
}>();

const emit = defineEmits<{
  (e: "onSearch", results: any[]): void;
}>();

// State
const searchQuery = ref<string>("");
const selectedYear = ref<string>("");
const selectedGenre = ref<string>("");
const errorMessage = ref<string>("");

const showFilters = ref<boolean>(false);

// Generate last 50 years
const currentYear = new Date().getFullYear();
const releaseYears: number[] = Array.from(
  { length: 50 },
  (_, i) => currentYear - i
);

// Methods
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const onSearchClick = async () => {
  if (!searchQuery.value.trim()) {
    errorMessage.value = "Movie name is required.";
    return;
  }

  errorMessage.value = "";

  const payload: Record<string, string> = {
    query: searchQuery.value,
    page: "1"
  };

  if (selectedYear.value) payload.year = selectedYear.value;
  if (selectedGenre.value) payload.with_genres = selectedGenre.value;

  try {
    const { data } = await ApiService.searchMovies(payload);
    emit("onSearch", data);
  } catch (err) {
    errorMessage.value = "Failed to fetch movies. Please try again.";
  }
};

const onClearClick = () => {
  searchQuery.value = "";
  selectedYear.value = "";
  selectedGenre.value = "";
  errorMessage.value = "";
};
</script>

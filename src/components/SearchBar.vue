<template>
  <div class="bg-gray-900 rounded-lg p-6 shadow-md mb-10">
    <div class="flex flex-col md:flex-row items-center gap-4">
      <input
        v-model="query"
        type="text"
        placeholder="Enter movie title..."
        class="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
      />

      <select
        v-model="year"
        class="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-purple-500"
      >
        <option>Any year</option>
        <option v-for="y in years" :key="y">{{ y }}</option>
      </select>

      <select
        v-model="genre"
        class="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:ring-2 focus:ring-purple-500"
      >
        <option>Any genre</option>
        <option>Action</option>
        <option>Drama</option>
        <option>Comedy</option>
        <option>Thriller</option>
      </select>

      <button
        @click="searchMovies"
        class="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
      >
        Search Movies
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const query = ref("");
const year = ref("Any year");
const genre = ref("Any genre");

const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

function searchMovies() {
  const payload = {
    query: query.value,
    year: year.value,
    genre: genre.value,
  };
  console.log("Searching:", payload);
  // Emit search event
  emit("onSearch", payload);
}
</script>

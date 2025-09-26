<template>
  <div
    class="flex flex-col items-center justify-center text-center py-16 text-gray-400"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16 text-gray-500 mb-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-4.35-4.35M9.5 17a7.5 7.5 0 1 1 0-15 
               7.5 7.5 0 0 1 0 15z"
      />
    </svg>

    <h2 class="text-lg font-semibold text-white">No movies found</h2>
    <p class="mt-2 text-gray-400 max-w-md">
      Try adjusting your search criteria or searching for a different movie.
    </p>

    <button
      @click="$emit('showPopular')"
      class="mt-6 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition"
    >
      View Popular Movies
    </button>
  </div>
</template>

<script setup>
defineEmits(["showPopular"]);
</script>

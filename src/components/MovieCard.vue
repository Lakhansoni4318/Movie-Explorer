<template>
  <div
    class="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
  >
    <img :src="movie.poster" :alt="movie.title" class="w-full h-72 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
      <p class="text-sm text-gray-400">{{ movie.year }}</p>
      <p class="text-sm text-gray-300 line-clamp-2 mt-2">
        {{ movie.description }}
      </p>
      <div class="flex justify-between items-center mt-3">
        <span class="text-yellow-400 font-bold">⭐ {{ movie.rating }}</span>
        <button
          class="px-3 py-1 bg-purple-600 rounded-md text-sm hover:bg-purple-700"
        >
          Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: Object,
});
</script>

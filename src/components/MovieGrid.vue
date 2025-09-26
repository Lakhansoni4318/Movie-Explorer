<template>
  <section>
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <MovieCard v-for="m in movies" :key="m.id" :movie="m" />
    </div>
  </section>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";

defineProps({
  movies: Array,
  title: String,
});
</script>

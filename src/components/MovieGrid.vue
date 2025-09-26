<template>
  <section>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <MovieCard
        v-for="m in moviesData?.results || []"
        :key="m.id"
        :genre-names="getGenreNames(m)"
        :movie="m"
      />
    </div>

    <div class="flex justify-center mt-6">
      <button
        v-if="moviesData?.page < moviesData?.total_pages"
        @click="$emit('loadMore')"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Show More
      </button>
    </div>
  </section>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";
defineEmits(["loadMore"]);

const props = defineProps({
  moviesData: [Object, String],
  genredata: Array,
});

const getGenreNames = (movie) => {
  if (!movie) return [];
  if (movie.genre_ids) {
    return props.genredata
      .filter((g) => movie.genre_ids.includes(g.id))
      .map((g) => g.name);
  }
  return [];
};
</script>

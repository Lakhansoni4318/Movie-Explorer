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

    <div v-if="isLoading" class="flex justify-center mt-6">
      <span class="text-gray-500">Loading...</span>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import MovieCard from "@/components/MovieCard.vue";

const props = defineProps({
  moviesData: [Object, String],
  genredata: Array,
});

const emit = defineEmits(["loadMore"]);
const isLoading = ref(false);

const getGenreNames = (movie) => {
  if (!movie) return [];
  if (movie.genre_ids) {
    return props.genredata
      .filter((g) => movie.genre_ids.includes(g.id))
      .map((g) => g.name);
  }
  return [];
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 200 && !isLoading.value) {
    if (props.moviesData?.page < props.moviesData?.total_pages) {
      isLoading.value = true;
      emit("loadMore");
    }
  }
};

watch(
  () => props.moviesData,
  () => {
    isLoading.value = false;
  }
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

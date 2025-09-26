<template>
  <div class="bg-black text-white min-h-screen">
    <Navbar @goFavorites="handleFavorites" @openSearch="handleSearchOpen" />

    <main class="px-6 py-8">
      <HeroSection />
      <SearchBar @onSearch="handleSearch" />
      <MovieGrid :movies="movies" title="Popular Movies" />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import SearchBar from "./components/SearchBar.vue";
import MovieGrid from "./components/MovieGrid.vue";
import { ref } from "vue";

const movies = ref([
  {
    id: 1,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
  },
  {
    id: 2,
    title: "Titanic",
    year: 1997,
    rating: 7.9,
    genre: "Romance",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    description:
      "A young aristocrat falls in love with a kind but poor artist aboard the luxurious Titanic.",
  },
  {
    id: 3,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: "Crime",
    poster: "https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
    description:
      "The lives of two mob hitmen, a boxer, and others intertwine in a tale of violence and redemption.",
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    description:
      "A man with a low IQ recounts his early years in the Deep South and his epic journey through life.",
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into a CEO's mind.",
  },
  {
    id: 7,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 8,
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
  },
]);

function handleFavorites() {
  console.log("Navigate to Favorites");
}

function handleSearchOpen() {
  console.log("Open search overlay/modal");
}

function handleSearch(payload) {
  console.log("Search triggered with:", payload);
}
</script>

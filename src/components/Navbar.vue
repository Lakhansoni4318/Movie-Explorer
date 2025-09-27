<template>
  <header class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <router-link
        to="/"
        class="text-2xl font-extrabold tracking-wide text-purple-500 cursor-pointer hover:text-purple-400 transition"
      >
        🎬 Movie Explorer
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6">
        <button :class="navButtonClass('/')" @click="goToRoute('/')">
          Search
        </button>
        <button
          :class="navButtonClass('/favorites')"
          @click="goToRoute('/favorites')"
        >
          Favorites
        </button>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-gray-300 hover:text-purple-400 transition"
        @click="toggleMobileMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div
        v-if="isMobileOpen"
        class="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4"
      >
        <button
          :class="navButtonClass('/') + ' block w-full text-left'"
          @click="
            goToRoute('/');
            toggleMobileMenu();
          "
        >
          Search
        </button>
        <button
          :class="navButtonClass('/favorites') + ' block w-full text-left'"
          @click="
            goToRoute('/favorites');
            toggleMobileMenu();
          "
        >
          Favorites
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const isMobileOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value;
};

const goToRoute = (path: string) => {
  router.push(path);
};

const navButtonClass = (path: string) => {
  return route.path === path
    ? "px-4 py-2 rounded-lg font-medium transition bg-purple-600 text-white"
    : "px-4 py-2 rounded-lg font-medium transition text-gray-300 hover:bg-purple-700 hover:text-white";
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

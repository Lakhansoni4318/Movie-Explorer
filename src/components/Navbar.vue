<template>
  <header class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <h1
        class="text-2xl font-extrabold tracking-wide text-purple-500 cursor-pointer hover:text-purple-400 transition"
      >
        🎬 Movie Explorer
      </h1>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6">
        <button
          class="text-gray-300 hover:text-purple-400 transition-colors"
          @click="$emit('goFavorites')"
        >
          Favorites
        </button>
        <button
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
          @click="$emit('openSearch')"
        >
          Search
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
          class="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors"
          @click="$emit('goFavorites'); toggleMobileMenu()"
        >
          Favorites
        </button>
        <button
          class="block w-full text-left px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
          @click="$emit('openSearch'); toggleMobileMenu()"
        >
          Search
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMobileOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value;
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

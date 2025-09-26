<template>
  <header class="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
    <!-- Logo -->
    <h1 class="text-xl font-bold text-purple-400 cursor-pointer">
      🎬 Movie Explorer
    </h1>

    <!-- Right side -->
    <div class="flex items-center gap-4">
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
    </div>
  </header>
</template>

<script setup>
// This Navbar emits events so parent can handle navigation
// - "goFavorites" -> navigate to favorites page
// - "openSearch" -> open search modal/section
</script>

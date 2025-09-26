<template>
  <div class="bg-black text-white min-h-screen">
    <Navbar />
    <main class="px-6 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

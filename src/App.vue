<template>
  <div class="bg-black text-white min-h-screen">
    <Navbar />
     <SpeedInsightsWrapper />
    <main class="px-6 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import SpeedInsightsWrapper from "@/components/SpeedInsightsWrapper.vue";
</script>

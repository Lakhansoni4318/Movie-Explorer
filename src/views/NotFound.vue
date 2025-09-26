<template>
  <div
    class="flex flex-col items-center justify-center w-full text-white text-center bg-gray-900"
    :style="{ height: 'calc(100vh - 138px)' }"
  >
    <h1 class="text-6xl font-extrabold text-purple-500 mb-4">404</h1>
    <h2 class="text-3xl font-bold mb-2">Page Not Found</h2>
    <p class="text-gray-400 mb-6">
      Oops! The page you are looking for does not exist.
    </p>
    <button
      @click="goHome"
      class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition text-white"
    >
      Go to Homepage
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => router.push("/");
</script>

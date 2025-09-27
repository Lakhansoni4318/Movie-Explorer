import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  { path: "/", name: "Home", component: () => import("@/views/Home.vue") },
  { path: "/movie/:id", name: "MovieDetails", component: () => import("@/views/MovieDetails.vue") },
  { path: "/favorites", name: "Favorites", component: () => import("@/views/FavoritesMovie.vue") },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

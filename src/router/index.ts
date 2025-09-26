import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import NotFound from "@/views/NotFound.vue";
import FavoritesMovie from "@/views/FavoritesMovie.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/movie/:id", name: "MovieDetails", component: MovieDetails },
  { path: "/favorites", name: "favorites", component: FavoritesMovie },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

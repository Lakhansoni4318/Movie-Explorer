import api from "./siteconfig.ts";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export default {
  fetchGenres() {
    return api.get("/genre/movie/list", {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
  },
  searchMovies(params:any) {
    return api.get("/search/movie", {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });
  },
  popularMovies(page:Number) {
    return api.get("/movie/popular", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page
      },
    });
  },
};

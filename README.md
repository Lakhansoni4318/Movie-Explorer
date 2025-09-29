# Movie Explorer

## Overview

**Movie Explorer** is a Vue 3 + TypeScript web application built with Vite that allows users to search for movies, view details, and manage a personal list of favorite movies. It integrates with the TMDB (The Movie Database) API and includes offline support, local caching, and advanced UI/UX features.

This project demonstrates modern Vue 3 features, Composition API, Pinia state management, routing, performance optimizations, form validation, and code quality practices such as Husky pre-commit and pre-push checks.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup & Installation](#setup--installation)
4. [Project Structure](#project-structure)
5. [Routing](#routing)
6. [State Management](#state-management)
7. [Form Handling & Validation](#form-handling--validation)
8. [Performance & UX](#performance--ux)
9. [Offline Support & Caching](#offline-support--caching)
10. [Husky & Code Quality](#husky--code-quality)
11. [Deployment](#deployment)
12. [TMDB API Integration](#tmdb-api-integration)
13. [Usage](#usage)
14. [Credits](#credits)

---

## Features

- Multi-field search: search by title, year, and genre
- Display popular movies by default
- Movie details page with lazy loading
- Add/Remove movies from favorites
- Store favorites locally (localStorage & Pinia)
- Offline support for favorites page
- Infinite scroll for search results (JS events, no extra package)
- Notes and rating for favorite movies
- Skeleton loaders and placeholder images
- IndexedDB caching for search results
- Form validation and error handling (no movie found, network errors)
- Husky pre-commit & pre-push checks for formatting and debugger/console errors
- Deployed on Vercel

---

## Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **State Management:** Pinia + pinia-plugin-persistedstate
- **Routing:** Vue Router 4
- **Build Tool:** Vite
- **CSS:** Tailwind CSS
- **HTTP Requests:** Axios
- **Offline Storage:** localStorage & IndexedDB (via idb)
- **Code Quality:** Husky, Prettier, lint-staged
- **Notifications:** vue3-toastify
- **Icons:** @heroicons/vue
- **Deployment:** Vercel

**Node Version:** v22.12.0

---

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/Lakhansoni4318/Movie-Explorer.git
cd Movie-Explorer
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory and add your TMDB API key:

```
VITE_TMDB_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3/
```

4. Run the development server:

```bash
bun run dev
```

5. Build for production:

```bash
bun run build
```

6. Preview production build locally:

```bash
bun run preview
```

---

## Project Structure

```
├─ src/
│  ├─ api/          # TMDB API service
│  ├─ assets/       # Images, icons
│  ├─ components/   # Reusable components (MovieCard, MovieList, SearchForm)
│  ├─ composables/  # useFavorites, useMoviesSearch
│  ├─ pages/        # Main pages: Home, MovieDetails, Favorites
│  ├─ router/       # Vue Router setup with lazy loading
│  ├─ store/        # Pinia stores
│  └─ style.css       # Tailwind and global styles
```

---

## Routing

- `/` → Search page with popular movies and search results
- `/movie/:id` → Movie details page
- `/favorites` → Favorites page

Navigation is implemented using `<RouterLink>`.

---

## State Management

- **Pinia** handles global state for:
  - Favorite movies (add, remove, notes, rating)
  - Persisted in localStorage via pinia-plugin-persistedstate

- Offline support allows favorites page to function without internet.

---

## Form Handling & Validation

- Multi-field search form (title, year, genre)
- Movie name field must be filled to submit
- User-friendly error messages displayed

---

## Performance & UX

- Lazy-loaded components using Vue dynamic imports
- `v-memo` used to prevent unnecessary re-renders
- Skeleton loaders for images and movie cards
- Placeholder images for broken posters
- Infinite scroll implemented with JS events
- Optimistic UI updates for favorites

---

## Offline Support & Caching

- IndexedDB used to cache search results
- Favorites stored locally to allow offline viewing and management
- If offline, cached data is used instead of API calls

---

## Husky & Code Quality

- **Pre-commit**: Formats code using Prettier
- **Pre-push**: Checks for `console.log` and `debugger` statements, runs build to prevent broken code
- **Lint-staged** configured for multiple file types

---

## Deployment

- Project deployed on **Vercel** → [Movie Explorer Live](https://movix-explorer.vercel.app)
- Continuous deployment supported via GitHub repository

---

## TMDB API Integration

- **Base URL:** `https://api.themoviedb.org/3`
- **Endpoints:**
  - Search: `/search/movie?api_key={API_KEY}&query={query}`
  - Movie details: `/movie/{movie_id}?api_key={API_KEY}`
- **Images:** `https://image.tmdb.org/t/p/w500/{poster_path}`

---

## Usage

1. Open the app in browser
2. Search movies using title, year, or genre
3. Click on a movie card to view details
4. Add/remove movies from favorites and add notes/ratings
5. Favorites are available offline and synced with localStorage

---

## Credits

- **Vue 3** - https://vuejs.org/
- **Pinia** - https://pinia.vuejs.org/
- **TMDB API** - https://www.themoviedb.org/documentation/api
- **Tailwind CSS** - https://tailwindcss.com/
- **Vercel** - https://vercel.com/

---

_This README was generated to comprehensively document the Movie Explorer project, its architecture, features, and setup instructions._

<template>
  <section
    class="relative rounded-xl overflow-hidden shadow-lg mb-8"
  >
    <img
      src="https://www.shutterstock.com/image-vector/cinema-hall-blank-screen-rows-600nw-2469487429.jpg"
      alt="Cinema"
      class="w-full h-72 md:h-96 object-cover"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 flex flex-col justify-center px-8 md:px-16">
      <h2 class="text-4xl md:text-5xl font-extrabold text-purple-400 drop-shadow-lg">
        Discover Movies
      </h2>

      <p class="text-gray-300 mt-4 max-w-xl text-base md:text-lg leading-relaxed">
        Search through thousands of movies, discover new favorites, and build your personal collection.
      </p>

      <div class="mt-6 flex items-center space-x-2 text-yellow-400 text-sm font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.33-.314-.158-.888.283-.95l4.898-.696L8.465.792a.513.513 0 0 1 .919 0l2.2 4.327 4.898.696c.441.062.613.636.282.95l-3.521 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <span>Powered by TMDB</span>
      </div>
    </div>
  </section>
</template>

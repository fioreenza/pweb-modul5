<template>
  <nav class="bg-[#061547] py-6 px-8">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="text-[#fffbeb] text-2xl font-bold">
        <router-link to="/"> Book Store </router-link>
      </div>

      <!-- Menu items for desktop -->
      <div class="hidden font-bold text-[#fffbeb] md:flex text-xl space-x-6">
        <router-link to="/" class="hover:text-[#fffbeb]">Catalog</router-link>
        <router-link to="/addbook" class="hover:text-[#fffbeb]">Add Book</router-link>
      </div>

      <!-- Hamburger icon for mobile -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="text-[#fffbeb] focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" 
         class="fixed inset-0 bg-[#061547] bg-opacity-50 z-10 md:hidden transition-all duration-300"
         @click="toggleMenu">
      <!-- Slide-in menu from the right -->
      <div class="absolute right-0 top-0 bg-[#061547] text-[#fffbeb] font-bold text-xl w-64 h-full transition-transform duration-300 transform" 
           :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }">
           <router-link to="/" class="block px-4 py-2 hover:text-[#061547] hover:bg-[#fffbeb]" @click="toggleMenu">Catalog</router-link>
        <router-link to="/addbook" class="block px-4 py-2 hover:text-[#061547] hover:bg-[#fffbeb]" @click="toggleMenu">Add Book</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
/* Custom styles (optional) */
</style>

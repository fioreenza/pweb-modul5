<template>
  <main class="bg-[#FFF7ED] text-[#061547] py-12 px-6">
    <div class="container mx-auto flex justify-center flex-col px-4">
      <h1 class="text-2xl font-bold mb-4">Catalog Books</h1>
      <!-- Responsive grid layout -->
       <div class="w-full justify-center flex items-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="book in books"
          :key="book._id"
          class="bg-white w-64 sm:w-full flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <img
            :src="book.coverImage"
            alt="Book Cover"
            class="w-full max-h-80 object-contain rounded-md mb-2"
          />
          <div>
        <div
          v-for="tag in book.tags"
          :key="tag"
          class="px-2 py-1 mr-1 rounded-xl text-xs mb-2 bg-blue-100 text-blue-600 hover:bg-blue-200 inline-flex"
        >
          {{ tag }}
        </div>
          <h2 class="text-lg font-semibold">{{ book.title }}</h2>
          <p>{{ book.author }}</p>
          <div class="flex justify-between items-end mt-4">
            <p class="text-sm">Stock: {{ book.qty }}</p>
            <router-link
              :to="{ name: 'book-detail', params: { id: book._id } }"
              class="bg-[#061547] text-white text-xs rounded-2xl px-4 py-2 hover:-translate-y-1 transition-all"
            >
              View Detail
            </router-link>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Book {
  _id: string;
  coverImage: string;
  title: string;
  tags: string[];
  author: string;
  qty: number;
}

export default {
  setup() {

    const books = ref<Book[]>([]);

    onMounted(async () => {
      try {
        const response = await axios.get('https://pweb-books-api.vercel.app//book');
        books.value = response.data.data; 
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Failed to fetch books.');
      }
    });

    return {
      books,
    };
  },
};
</script>

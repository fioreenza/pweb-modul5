<template>
  <div v-if="book" class="book-detail bg-[#FFF7ED]">
    <div class="container mx-auto px-4 py-8 flex justify-center">
      <!-- Book Detail Section -->
      <div class="w-[80%] sm:w-[70%] md:w-[90%] lg:w-[65%] xl:w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center">
        <!-- Cover Image -->
        <div class="justify-center flex">
          <img
            :src="book.coverImage"
            :alt="`Cover of ${book.title}`"
            class="w-full h-auto max-w-[250px] object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <!-- Book Details -->
        <div>
          <h2 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2">{{ book.title }}</h2>
          <p class="text-sm md:text-lg text-gray-600 font-medium mb-4">by {{ book.author }}</p>
          
          <div class="flex items-center text-sm md:text-md text-gray-500 space-x-4 mb-6">
            <p>Rating: <span class="font-semibold text-gray-700">{{ book.rating.average }}</span></p>
            <p>Reviews: <span class="font-semibold text-gray-700">{{ book.rating.count }}</span></p>
          </div>
          
          <p class="text-gray-700 mb-4">{{ book.description }}</p>
          
          <p class="text-sm text-gray-600 mb-4">
            Published by <span class="font-semibold text-gray-800">{{ book.publisher }}</span> on
            <span class="font-semibold text-gray-800">{{ formatDate(book.publishedDate) }}</span>
          </p>
          
          <!-- Tags -->
          <div class="flex flex-wrap mb-4">
            <span
              v-for="tag in book.tags"
              :key="tag"
              class="px-3 py-1 mr-2 mb-2 bg-blue-100 text-blue-600 rounded-full text-xs hover:bg-blue-200 cursor-pointer"
            >
              {{ tag }}
            </span>
          </div>      
          
          <!-- Stock and Buttons -->
          <div class="flex justify-between items-center mt-6">
            <p class="text-sm md:text-md text-gray-600">
              Stock: <span class="font-semibold text-gray-800">{{ book.qty }}</span>
            </p>
            <div class="flex space-x-3">
              <router-link
                to="/"
                class="bg-blue-800 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 transition-all"
              >
                <Back class="w-4 h-4" />
              </router-link>
              <button
                @click="openDeleteModal"
                class="bg-red-800 text-white px-4 py-2 rounded-2xl hover:bg-red-600 transition-all"
              >
                <Delete class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Delete Modal -->
    <DeleteBook
      v-if="showDeleteModal"
      :bookId="book._id"
      @close="closeDeleteModal"
      @deleted="handleBookDeleted"
    />
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="text-center py-8">
    <p class="text-red-600 text-lg font-semibold">{{ error }}</p>
  </div>

  <!-- Loading State -->
  <div v-else class="text-center py-8">
    <p class="text-gray-600 text-lg">Loading...</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import DeleteBook from './DeleteBook.vue';

interface Book {
  _id: string;
  coverImage: string;
  title: string;
  publishedDate: string;
  publisher: string;
  description: string;
  tags: string[];
  author: string;
  qty: number;
  rating: {
    count: number;
    average: number;
  };
}

export default {
  components: {
    DeleteBook,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const book = ref<Book | null>(null);
    const error = ref<string | null>(null);
    const showDeleteModal = ref(false);

    onMounted(async () => {
      try {
        const response = await axios.get(
          `https://pweb-books-api.vercel.app//book/${route.params.id}`
        );
        book.value = response.data.data;
      } catch (err) {
        console.error('Error fetching book details:', err);
        error.value = 'Failed to load book details';
        alert('Failed to fetch book details');
      }
    });

    const openDeleteModal = () => {
      showDeleteModal.value = true;
    };

    const closeDeleteModal = () => {
      showDeleteModal.value = false;
    };

    const handleBookDeleted = () => {
      alert('Book deleted successfully!');
      router.push('/');
    };

    const formatDate = (date: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return new Date(date).toLocaleDateString('en-US', options);
    };

    return {
      book,
      error,
      showDeleteModal,
      openDeleteModal,
      closeDeleteModal,
      handleBookDeleted,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Optional styling for finer control if needed */
</style>

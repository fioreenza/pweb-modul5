<template>
  <div 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" 
  >
    <div class="bg-white rounded-lg shadow-lg w-96">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold">Delete Book</h3>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-4">
        <p>Are you sure you want to delete this book?</p>
      </div>

      <!-- Modal Footer -->
      <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
        <button 
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          @click="closeModal"
        >
          Cancel
        </button>
        <button 
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          @click="deleteBook"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'DeleteBookModal',
  props: {
    bookId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['close', 'deleted'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close'); 
    };

    const deleteBook = async () => {
      try {
        await axios.delete(`https://pweb-books-api.vercel.app//book/${props.bookId}`);
        alert('Book deleted successfully!');
        emit('deleted'); // Notify parent that book was deleted
      } catch (error) {
        console.error('Failed to delete book:', error);
        alert('Failed to delete the book.');
      }
    };

    return {
      closeModal,
      deleteBook,
    };
  },
});
</script>
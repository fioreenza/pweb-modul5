<template>
  <div class="min-h-screen bg-[#FFF7ED] flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-2xl rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Create Book</h1>
      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            v-model="book.title"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <!-- Author -->
        <div class="mb-4">
          <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
          <input
            id="author"
            v-model="book.author"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <!-- Published Date -->
        <div class="mb-4">
          <label for="publishedDate" class="block text-sm font-medium text-gray-700">Published Date</label>
          <input
            id="publishedDate"
            v-model="book.publishedDate"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <!-- Publisher -->
        <div class="mb-4">
          <label for="publisher" class="block text-sm font-medium text-gray-700">Publisher</label>
          <input
            id="publisher"
            v-model="book.publisher"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="book.description"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <!-- Cover Image -->
        <div class="mb-4">
          <label for="coverImage" class="block text-sm font-medium text-gray-700">Cover Image URL</label>
          <input
            id="coverImage"
            v-model="book.coverImage"
            type="url"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <!-- Tags -->
        <div class="mb-4">
          <label for="tags" class="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <!-- Initial Quantity -->
        <div class="mb-4">
          <label for="initialQty" class="block text-sm font-medium text-gray-700">Initial Quantity</label>
          <input
            id="initialQty"
            v-model.number="book.initialQty"
            type="number"
            min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
          <p
            v-if="book.initialQty < 0 && book.initialQty !== 0"
            class="text-red-500 text-sm mt-1"
          >
            Initial quantity must be greater than or equal to 0.
          </p>
        </div>

        <!-- Quantity -->
        <div class="mb-4">
          <label for="qty" class="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            id="qty"
            v-model.number="book.qty"
            type="number"
            min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
          <p
            v-if="book.qty < 0 && book.qty !== 0"
            class="text-red-500 text-sm mt-1"
          >
            Quantity must be greater than or equal to 0.
          </p>
          <p
            v-if="book.qty > book.initialQty && book.initialQty > 0"
            class="text-red-500 text-sm mt-1"
          >
            Quantity cannot exceed initial quantity.
          </p>
        </div>

        <!-- Rating -->
        <div class="mb-4">
          <label for="rating-average" class="block text-sm font-medium text-gray-700">Rating Average</label>
          <input
            id="rating-average"
            v-model.number="book.rating.average"
            type="number"
            min="0"
            max="5"
            step="0.1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div class="mb-4">
          <label for="rating-count" class="block text-sm font-medium text-gray-700">Rating Count</label>
          <input
            id="rating-count"
            v-model.number="book.rating.count"
            type="number"
            min="0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            class="bg-[#061547] text-white rounded-2xl px-4 py-2 hover:bg-[#2a4292] transition-all"
            :disabled="!isFormValid"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { ref, computed } from "vue";

export default {
  name: "CreateBook",
  setup() {
    const book = ref({
      title: "",
      author: "",
      publishedDate: "",
      publisher: "",
      description: "",
      coverImage: "",
      tags: [] as string[],
      initialQty: 0,
      qty: 0,
      rating: {
        average: 0,
        count: 0,
      },
    });

    const tagsInput = ref("");

    const isFormValid = computed(() => {
      return (
        book.value.initialQty >= 0 &&
        book.value.qty >= 0 &&
        book.value.qty <= book.value.initialQty
      );
    });

    const handleSubmit = async () => {
      if (!isFormValid.value) {
        alert("Form is invalid. Please fix the errors.");
        return;
      }

      book.value.tags = tagsInput.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      try {
        const response = await fetch(
          "https://pweb-books-api.vercel.app/book",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(book.value),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create book");
        }

        alert("Book created successfully!");
        book.value = {
          title: "",
          author: "",
          publishedDate: "",
          publisher: "",
          description: "",
          coverImage: "",
          tags: [],
          initialQty: 0,
          qty: 0,
          rating: {
            average: 0,
            count: 0,
          },
        };
        tagsInput.value = "";
        router.push("/");
      } catch (error) {
        console.error(error);
        alert("Failed to create book. Please try again.");
      }
    };

    return {
      book,
      tagsInput,
      isFormValid,
      handleSubmit,
    };
  },
};
</script>

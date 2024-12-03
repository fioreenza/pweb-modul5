import DeleteBook from '@/components/DeleteBook.vue'
import CatalogView from '@/views/CatalogView.vue'
import CreateView from '@/views/CreateView.vue'
import DetailView from '@/views/DetailView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'books',
      component: CatalogView,
    },
    {
      path: '/:id',
      name: 'book-detail',
      component: DetailView,
      props: true,
    },
    {
      path: '/addbook',
      name: 'add-book',
      component: CreateView,
    },
    {
      path: '/deletebook/:id',
      name: 'delete-book',
      component: DeleteBook,
      props: true,
    },
    // route not found handler
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'books' },
    },
  ],
})


export default router

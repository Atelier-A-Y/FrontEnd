import { createRouter, createWebHistory } from 'vue-router'
import AdicionarProduto from '../views/AdicionarProduto.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AdicionarProduto',
      component: AdicionarProduto
    },
  ],
})

export default router

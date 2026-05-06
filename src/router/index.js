import { createRouter, createWebHistory } from 'vue-router'

import AdicionarProduto from '../views/AdicionarProduto.vue'
import Produtos from '../views/Produtos.vue'

const routes = [

  {
    path: '/',
    component: AdicionarProduto
  },

  {
    path: '/produtos',
    component: Produtos
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import AdicionarProduto from '../views/AdicionarProduto.vue'
import Produtos from '../views/Produtos.vue'
import Favoritos from '../views/Favoritos.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/adicionar',
    component: () => import('../views/AdicionarProduto.vue')
  },

  {
    path: '/produtos',
    component: () => import('../views/Produtos.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/cadastrar',
    component: () => import('../views/CadastroView.vue')
  },
  {
    path: '/user',
    component: () => import('../views/UserView.vue')
  },
   {
    path: '/favoritos',
    component: Favoritos
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


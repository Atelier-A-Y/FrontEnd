import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/info_prod/:id',
    component: () => import('../views/InfoProdutosView.vue')
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
    path: '/carrinho',
    component: () => import('../views/CarrinhoView.vue')
  },
   {
    path: '/favoritos',
    component: () => import('../views/Favoritos.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


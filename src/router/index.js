import { createRouter, createWebHistory } from 'vue-router'

// Suas rotas aqui
const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
]

// Criando o router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Export padrão
export default router

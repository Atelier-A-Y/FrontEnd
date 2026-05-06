import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/casamento',
    component: () => import('../views/CasamentoView.vue')
  },
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

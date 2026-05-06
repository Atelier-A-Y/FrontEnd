import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/casamento',
    component: () => import('../views/CasamentoView.vue')
  },
  {
    path: '/formatura',
    component: () => import('../views/FormaturaView.vue')
  },
  {
    path: '/praia',
    component: () => import('../views/PraiaView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

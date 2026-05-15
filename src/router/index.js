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
  {
    path: '/casual',
    component: () => import('../views/CasualView.vue')
  },
  {
    path: '/terno',
    component: () => import('../views/TernoView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

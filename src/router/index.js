
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/cadastrar',
    component: () => import('../views/CadastroView.vue')
  },
  {
    path: '/home',
    component: () => import('../views/HomeView.vue')
  },
    {
        path: '/casamento',
        name: 'Casamento',
        component: () => import('../views/casamento.vue')
        }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

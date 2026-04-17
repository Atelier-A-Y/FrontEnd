
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/LoginComponent.vue')
  },
  {
    path: '/cadastrar',
    component: () => import('../components/CadastroComponent.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

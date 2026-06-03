import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/user',
    component: () => import('../views/UserView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

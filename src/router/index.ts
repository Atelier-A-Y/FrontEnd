import { createRouter, createWebHistory } from 'vue-router'
import Favoritos from '../views/Favoritos.vue'

const routes = [

  {
    path: '/favoritos',
    component: Favoritos
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

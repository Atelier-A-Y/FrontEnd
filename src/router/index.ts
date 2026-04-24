import { createRouter, createWebHistory} from 'vue-router'
import casamento from '@/views/casamento.vue'
import HomeView from '@/views/HomeView.vue'

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {   
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/casamento',
            name: 'casamento',
            component: casamento
        }

    ]
})

export default routes

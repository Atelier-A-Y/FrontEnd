import { createRouter, createWebHistory} from 'vue-router'
import App from '@/App.vue'
import teste1 from '@/views/teste1.vue'

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {   
            path: '/',
            name: 'home',
            component: App.vue
        },
        {
            path: '/casamento',
            name: 'casamento',
            component: teste1.vue
        }

    ]
})

export default routes

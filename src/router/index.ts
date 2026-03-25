import { createRouter, createWebHistory} from 'vue-router'
import App from '@/App.vue'

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {   
            path: '/',
            name: 'home',
            component: App.vue
        }
    ]
})

export default routes
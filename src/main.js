import './assets/main.css' /*NÂO APAGA ESSA LINHA*/
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vue3-colorpicker/style.css'
import Vue3ColorPicker from 'vue3-colorpicker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3ColorPicker)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import store from './store'
import Particles from "particles.vue3";
import 'element-plus/dist/index.css'

const app = createApp(App)
app.config.globalProperties.$routerG = router

createApp(App).use(ElementPlus).use(router).use(store).use(Particles).mount('#app')


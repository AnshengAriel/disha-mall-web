import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/composables/store'
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.mount('#app')

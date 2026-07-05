import { createApp, createElementVNode } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus, { ElLoadingDirective } from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import router from '@/configs/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from '@/main/composables/AppStoreUse'
import 'nprogress/nprogress.css'
import permission from './configs/directives/permission'
import Table from '@/components/Table.vue'
import Drawer from '@/components/Drawer.vue'
import CountTo from '@/components/CountTo.vue'
import TableRower from '@/components/TableRower.vue'
import FileUpload from '@/components/FileUpload.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import Dialog from './components/Dialog.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(permission)

app.component('Table', Table)
app.component('Drawer', Drawer)
app.component('CountTo', CountTo)
app.component('TableRower', TableRower)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('Dialog', Dialog)

app.mount('#app')
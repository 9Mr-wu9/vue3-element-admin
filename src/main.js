import { createApp } from 'vue'
import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store';
import './styles/common.scss'
import './styles/index.scss';

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  size: Cookies.get('size') || 'medium',
})

app.use(store).use(router).mount('#app')

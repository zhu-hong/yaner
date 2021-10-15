import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Nav, Header } from '../modules/z-ui'
import './assets/style.css'
import 'ant-design-vue/lib/message/style/index.css'

createApp(App)
  .use(Nav)
  .use(Header)
  .use(router)
  .mount('#app')

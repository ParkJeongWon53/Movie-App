import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import store from './store/index.js'
import LoadImage from './plugins/LoadImage.js'


createApp(App)
  .use(router) // $route, $router
  .use(store) // $store
  .use(LoadImage) // $LoadImage
  .mount('#app')
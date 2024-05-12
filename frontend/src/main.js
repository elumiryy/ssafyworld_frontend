import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'
import store from './store/signup.js'

// 생성한 뷰 라우터 받아오기
// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)  
app.use(store)
app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'

// 생성한 뷰 라우터 받아오기
// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)  // 라우터 사용
app.mount('#app')
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import mainPage from './components/mainPage.vue'
import title from './components/title.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: mainPage,
    },
    {
      path: '/titleid/:titleid?',
      component: title,
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
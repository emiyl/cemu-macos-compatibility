import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import mainPage from './components/mainPage.vue'
import navbar from './components/navbar.vue'
import title from './components/title.vue'
import installation from './components/installation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: mainPage,
    },
    {
      path: '/installation',
      component: installation
    },
    {
      path: '/instructions',
      redirect: to => { return { path: '/installation' }},
    },
    {
      path: '/titleid/:titleid?',
      component: title,
    }
  ]
})

const app = createApp(App)

app
.use(router)
.component('navbar', navbar)
.mount('#app')
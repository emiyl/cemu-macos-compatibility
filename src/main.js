import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import main from './components/main.vue'
import navbar from './components/navbar.vue'
import title from './components/title.vue'
import installation from './components/installation.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: main,
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
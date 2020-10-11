import Vue from 'vue'
import Router from 'vue-router'
import createStore from '../store/store'

Vue.use(Router)

export function createRouter() {
  const store = createStore()
  const route = new Router({
    routes: [
      {
        path: '/',
        name: 'Main',
        component: async () => await import('../components/Main.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: async () => await import ('../components/About.vue')
      }
    ],
    mode: 'history'
  })
  return route
}



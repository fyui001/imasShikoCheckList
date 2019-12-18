import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import About from '../components/About.vue'

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ],
  mode: 'history'
})

export default route

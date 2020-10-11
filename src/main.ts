import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router'
import createStore from './store/store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const router = createRouter()
const store = createStore()

const app = new Vue({
  router,
  store,
  components: { App },
  render(h) {
    return h(App)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('root')
  if (mountPoint) {
    app.$mount(mountPoint)
  }
})



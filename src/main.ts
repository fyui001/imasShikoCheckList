import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/store"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

const app = new Vue({
  router,
  store,
  components: {App},
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



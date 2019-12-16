import Vue from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/store"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  components: {App},
  render(h) {
    return h(App)
  }
}).$mount("#root")


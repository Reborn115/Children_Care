
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
// import{ myRequest } from 'util/util.js'
Vue.use(uView);
Vue.config.productionTip = false
// Vue.prototype.$myRequest=myRequest
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
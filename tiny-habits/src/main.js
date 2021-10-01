import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/store.js'
import Axios from 'axios'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


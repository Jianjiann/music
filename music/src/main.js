import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import store from './store/index';
import router from './router';
  Vue.use(ElementUI)
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

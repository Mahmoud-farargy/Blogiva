import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import Vue2Editor from "vue2-editor";
import VueToast from 'vue-toast-notification';
import "./ui/index.scss";
Vue.config.productionTip = false;
Vue.use(Vue2Editor);
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

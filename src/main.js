import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import uploader from 'vue-simple-uploader'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'vue-echarts';

Vue.component('chart', Echarts);
Vue.use(ElementUI);
Vue.use(uploader)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

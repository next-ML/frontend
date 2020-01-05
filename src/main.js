import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import uploader from 'vue-simple-uploader'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'vue-echarts';
import VueDragDrop from 'vue-drag-drop';

Vue.component('chart', Echarts);
Vue.use(ElementUI);
Vue.use(uploader);
Vue.use(VueDragDrop);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

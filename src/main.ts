import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import BaseButton from '@/views/common/base-components/BaseButton.vue';

Vue.config.productionTip = false;

Vue.use(Vuesax);

Vue.component('BaseButton', BaseButton);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

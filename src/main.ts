import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import BaseButton from '@/views/common/base-components/BaseButton.vue';
import BaseCard from '@/views/common/base-components/BaseCard.vue';
import BaseAvatar from '@/views/common/base-components/BaseAvatar.vue';

Vue.config.productionTip = false;

Vue.use(Vuesax);

Vue.component('BaseButton', BaseButton);
Vue.component('BaseCard', BaseCard);
Vue.component('BaseAvatar', BaseAvatar);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

import _Vue from 'vue';
import store from '@/store';

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$confirm = (text: string): Promise<boolean> => {
      return store.dispatch('confirm/open', text);
    };
  },
};

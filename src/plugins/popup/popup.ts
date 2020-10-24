import _Vue from 'vue';
import PopupComponent from '@/views/common/plugin-components/BasePopup.vue';
import { PopupInfo } from '@/store/popup/types';
import store from '@/store';
import { Popup } from './types';

export const methods: Popup = {
  open(popupInfo: PopupInfo): void {
    return store.commit('popup/open', popupInfo);
  },
  close(): void {
    return store.commit('popup/close');
  },
};

export default {
  install(Vue: typeof _Vue) {
    Vue.component('Popup', PopupComponent);
    Vue.prototype.$popup = methods;
  },
};

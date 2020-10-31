import _Vue from 'vue';
import { Snackbar } from './types';

export const methods = (Vue: typeof _Vue): Snackbar => {
  const vsNotification = Vue.prototype.$vs.notification;

  return {
    info(text: string) {
      vsNotification({
        text,
        color: 'primary',
        position: 'top-right',
        buttonClose: false,
        clickClose: true,
      });
    },
    success(text: string) {
      vsNotification({
        text,
        color: 'success',
        position: 'top-right',
        buttonClose: false,
        clickClose: true,
      });
    },
    warn(text: string) {
      vsNotification({
        text,
        color: 'warning',
        position: 'top-right',
        buttonClose: false,
        clickClose: true,
      });
    },
    error(text: string) {
      vsNotification({
        text,
        color: 'danger',
        position: 'top-right',
        buttonClose: false,
        clickClose: true,
      });
    },
  };
};

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$snackbar = methods(Vue);
  },
};

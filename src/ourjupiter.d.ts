import { Popup } from '@/plugins/popup/types';

declare module 'vue/types/vue' {
  interface Vue {
    $popup: Popup;
    $vs: any;
  }
}

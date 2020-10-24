import { Popup } from '@/plugins/popup/types';

declare module 'vue/types/vue' {
  interface Vue {
    $confirm: (text: string) => Promise<boolean>;
    $popup: Popup;
    $vs: any;
  }
}

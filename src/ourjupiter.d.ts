import { Popup } from '@/plugins/popup/types';
import { Snackbar } from '@/plugins/snackbar/types';

declare module 'vue/types/vue' {
  interface Vue {
    $confirm: (text: string) => Promise<boolean>;
    $popup: Popup;
    $snackbar: Snackbar;
    $vs: any;
  }
}

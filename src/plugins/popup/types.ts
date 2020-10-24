import { PopupInfo } from '@/store/popup/types';

export interface Popup {
  open(popupInfo: PopupInfo): void;
  close(): void;
}

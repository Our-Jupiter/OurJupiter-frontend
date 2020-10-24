import { ConfirmState } from './confirm/types';
import { PopupState } from './popup/types';

export type RootState = {
  confirm: ConfirmState;
  popup: PopupState;
};

import { ConfirmState } from './confirm/types';
import { MeState } from './me/types';
import { PopupState } from './popup/types';

export type RootState = {
  confirm: ConfirmState;
  me: MeState;
  popup: PopupState;
};

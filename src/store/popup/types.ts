export interface PopupState {
  isOpen: boolean;
  component: any;
  preventClose: boolean;
  data: any;
}

export interface PopupInfo {
  component: any;
  preventClose?: boolean;
  data?: any;
}

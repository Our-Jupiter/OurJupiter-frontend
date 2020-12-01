export interface PopupState {
  isOpen: boolean;
  component: any;
  preventClose: boolean;
  notClose: boolean;
  data: any;
}

export interface PopupInfo {
  component: any;
  preventClose?: boolean;
  notClose?: boolean;
  data?: any;
}

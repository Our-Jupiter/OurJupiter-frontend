import { PopupState, PopupInfo } from './types';

export const popupState = (): PopupState => ({
  isOpen: false,
  component: null,
  preventClose: false,
  data: null,
});

export const mutations = {
  open(state: PopupState, popupInfo: PopupInfo) {
    state.isOpen = true;
    Object.assign(state, popupInfo);
  },
  close(state: PopupState) {
    state.isOpen = false;
    state.component = null;
    state.preventClose = false;
    state.data = null;
  },
};

export default {
  namespaced: true,
  state: popupState,
  mutations,
};

import { ConfirmState } from './types';

export const confirmState = (): ConfirmState => ({
  isOpen: false,
  text: '',
  resolver: new Function(),
});

export const mutations = {
  open(state: ConfirmState, text: string) {
    state.isOpen = true;
    state.text = text;
  },
  ok(state: ConfirmState) {
    state.resolver(true);
    state.isOpen = false;
    state.text = '';
  },
  cancel(state: ConfirmState) {
    state.resolver(false);
    state.isOpen = false;
    state.text = '';
  },
  setResolver(state: ConfirmState, resolver: Function) {
    state.resolver = resolver;
  },
};

export const actions = {
  open({ commit }: any, text: string) {
    commit('open', text);
    return new Promise(resolve => {
      commit('setResolver', resolve);
    });
  },
};

export default {
  namespaced: true,
  state: confirmState,
  mutations,
  actions,
};

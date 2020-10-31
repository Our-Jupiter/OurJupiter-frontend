import { MeState } from './types';
import axios from 'axios';

export const meState = (): MeState => ({
  me: {},
});

export const mutations = {
  putMe(state: MeState, meInfo: object) {
    state.me = meInfo;
  },
};

export const actions = {
  async putMe({ commit }: any) {
    const token = localStorage.getItem('token');
    const headers = token ? { 'x-access-token': token } : {};
    const meInfo = await axios.get('http://localhost:8080/me', { headers });
    commit('putMe', meInfo.data);
  },
};

export default {
  namespaced: true,
  state: meState,
  actions,
  mutations,
};

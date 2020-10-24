import Vue from 'vue';
import Vuex from 'vuex';
import confirm from './confirm/confirm';
import popup from './popup/popup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    confirm,
    popup,
  },
});

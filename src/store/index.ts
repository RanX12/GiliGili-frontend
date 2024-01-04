// store/index.ts
import { createStore } from 'vuex';

interface UIState {
  registerFormVisible: boolean;
}

interface State {
  count: number;
  ui: UIState;
}

const store = createStore<State>({
  state: {
    count: 0,
    ui: {
      registerFormVisible: false
    }
  },

  actions: {
    showUI({ commit }, payload) {
      commit('showUI', payload)
    },
  
    hideUI({ commit }, payload) {
      commit('hideUI', payload)
    },
  },

  mutations: {
    increment(state) {
      state.count++;
    },

    showUI(state, key: keyof UIState) {
      if (state.ui.hasOwnProperty(key)) {
        state.ui[key] = true;
      }
    },
  
    hideUI(state, key: keyof UIState) {
      if (state.ui.hasOwnProperty(key)) {
        state.ui[key] = false;
      }
    },
  },
});

export default store;

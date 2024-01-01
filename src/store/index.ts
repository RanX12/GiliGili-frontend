import { createStore } from 'vuex';

interface State {
  count: number;
}

const store = createStore<State>({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default store;

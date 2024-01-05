// store.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('usre', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLogged: (state) => !!state.user,
  },
  actions: {
    setUser(user = null) {
      this.user = user;
    },
  },
});

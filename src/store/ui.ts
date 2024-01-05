// store.js
import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    registerFormVisible: false, // It's better to initialize with a boolean if that's the intended type
    loginFormVisible: false,
  }),
  actions: {
    showUI(key: keyof this) { // 使用 keyof this 来确保 key 是 state 中的一个有效键
      console.log(key, this[key])
      if (key in this) { // 类型守卫，确保 key 存在于当前实例中
        this[key] = true;
      } else {
        console.warn(`Key "${key}" is not a valid state property.`);
      }
    },
    hideUI(key: keyof this) { // 同上
      if (key in this) {
        this[key] = false;
      } else {
        console.warn(`Key "${key}" is not a valid state property.`);
      }
    },
  },
});

import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore({
  state: {
    theme: 'light', // Pode ser 'light' ou 'dark'
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
  },
  actions: {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      commit('setTheme', newTheme);
    },
  },
  getters: {
    currentTheme: (state) => state.theme,
  },
  modules: {
    auth,
  },
});

export default store;

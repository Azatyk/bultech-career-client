import {
  login as loginRequest,
  register as registerRequest,
} from "../../requests/auth";

const storeLoggedIn = (isLoggedIn) => {
  if (!isLoggedIn) {
    localStorage.removeItem("isLoggedIn");
  } else {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }
};

export default {
  state: {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  },

  actions: {
    async login({ commit }, payload) {
      const data = await loginRequest(payload);
      commit("login");
      return data;
    },

    async register({ commit }, payload) {
      console.log(payload);
      const data = await registerRequest(payload);
      commit("login");
      return data;
    },
  },

  mutations: {
    login(state) {
      state.isLoggedIn = true;
      storeLoggedIn(true);
    },

    logout(state) {
      state.isLoggedIn = false;
      storeLoggedIn(false);
    },
  },

  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
};

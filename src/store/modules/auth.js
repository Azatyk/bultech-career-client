import { login as loginRequest } from "../../requests/auth";

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
    login({ commit }, payload) {
      return loginRequest(payload).then((data) => {
        commit("login");

        return data;
      });
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

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

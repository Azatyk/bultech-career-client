import axios from "axios";
import config from "@/config/config";
import store from "@/store/index";
import router from "@/router/index";

const instance = axios.create({
  baseURL: config.apiUrl,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    if (store.getters.authToken) {
      config.headers["Authorization"] = store.getters.authToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      store.commit("logout");
      router.push("/auth/login");
    }
    return Promise.reject(err);
  }
);

export default instance;

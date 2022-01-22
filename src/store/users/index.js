import { api } from "boot/axios";

export default {
  state: {
    users: [],
    loadingAuth: false,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setLoadingAuth(state, loadingAuth) {
      state.loadingAuth = loadingAuth;
    },
  },
  actions: {
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("setLoadingAuth", true);
        api
          .post("/users/login", payload)
          .then((response) => {
            commit("setUsers", response.data);
            commit("setLoadingAuth", false);
            resolve(response);
          })
          .catch((error) => {
            commit("setLoadingAuth", false);
            reject(error);
          });
      });
    },
  },
  getters: {
    users: (state) => state.users,
    loadingAuth: (state) => state.loadingAuth,
  },
};

import { api } from "boot/axios";

export default {
  state: {
    projects: [],
    error: null,
    loadingProjects: false,
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    setLoading(state, loading) {
      state.loadingProjects = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    fetchProjects({ commit }) {
      return new Promise((resolve, reject) => {
        commit("setLoading", true);
        api
          .get("/projects")
          .then((response) => {
            commit("setProjects", response.data);
            commit("setLoading", false);
            resolve(response);
          })
          .catch((error) => {
            commit("setError", error.response);
            commit("setLoading", false);
            reject(error);
          });
      });
    },
  },
  getters: {
    loadingProjects: (state) => state.loadingProjects,
  },
};

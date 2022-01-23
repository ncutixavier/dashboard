import { api } from "boot/axios";

export default {
  state: {
    stats: [],
    loadingStats: false,
  },
  mutations: {
    setStats(state, stats) {
      state.stats = stats;
    },
    setLoadingStats(state, loadingStats) {
      state.loadingStats = loadingStats;
    },
  },
  actions: {
    getStats({ commit }) {
      return new Promise((resolve, reject) => {
        commit("setLoadingStats", true);
        api
          .get("/stats")
          .then((response) => {
            commit("setStats", response.data);
            commit("setLoadingStats", false);
            resolve(response);
          })
          .catch((error) => {
            console.log("STATS-ERROR=>", error.response);
            commit("setLoadingStats", false);
            reject(error);
          });
      });
    },
  },
  getters: {
    stats: (state) => state.stats,
    loadingStats: (state) => state.loadingStats,
  },
};

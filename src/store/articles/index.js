import { api } from "boot/axios";

export default {
  state: {
    articles: [],
    loading: false,
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    getArticles({ commit }) {
      return new Promise((resolve, reject) => {
        commit("setLoading", true);
        api
          .get("/blogs")
          .then((response) => {
            commit("setArticles", response.data);
            commit("setLoading", false);
            resolve(response);
          })
          .catch((error) => {
            commit("setLoading", false);
            console.log("ARTICLES::", response.data);
            reject(error);
          });
      });
    },
  },
  getters: {
    articles: (state) => state.articles,
    loading: (state) => state.loading,
  },
};

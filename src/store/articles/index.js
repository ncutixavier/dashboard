import { api } from "boot/axios";

export default {
  state: {
    articles: [],
    article: [],
    errors: [],
    loading: false,
  },
  mutations: {
    setArticles(state, articles) {
      state.articles = articles;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setNewArticle(state, article) {
      state.article = article;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    setDeleteArticle(state, article) { 
      state.articles = article
    }
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
            reject(error);
          });
      });
    },
    publishNewArticle({ commit }, article) {
      return new Promise((resolve, reject) => {
        api
          .post("/blogs", article)
          .then((response) => {
            commit("setNewArticle", response.data);
            resolve(response);
          })
          .catch((error) => {
            commit("setErrors", error.response);
            reject(error);
          });
      });
    },
    deleteArticle({ commit }, id) {
      return new Promise((resolve, reject) => {
        api
          .delete(`/blogs/${id}`)
          .then((response) => {
            commit("setDeleteArticle", response.data);
            resolve(response);
          })
          .catch((error) => {
            commit("setErrors", error.response);
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

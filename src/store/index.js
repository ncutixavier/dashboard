import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import articles from './articles'
import users from './users'
import stats from './stats'
import projects from './projects'

export default store(function () {
  const Store = createStore({
    modules: {
      articles,
      users,
      stats,
      projects,
    },
    strict: process.env.DEBUGGING,
  });

  return Store
})

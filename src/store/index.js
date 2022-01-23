import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import articles from './articles'
import users from './users'
import stats from './stats'

export default store(function () {
  const Store = createStore({
    modules: {
      articles,
      users,
      stats
    },
    strict: process.env.DEBUGGING
  })

  return Store
})

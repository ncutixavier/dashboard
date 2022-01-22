import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import articles from './articles'
import users from './users'

export default store(function () {
  const Store = createStore({
    modules: {
      articles,
      users,
    },
    strict: process.env.DEBUGGING
  })

  return Store
})

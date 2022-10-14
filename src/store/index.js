import { createStore } from 'vuex'

export default createStore({
  state: {
    users: []
  },
  getters: {
    getUsers: (state) => {
      return state.users
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

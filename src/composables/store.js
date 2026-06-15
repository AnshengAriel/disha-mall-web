import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      user: {},
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  }
})

export default store

export function getUser() {
  return store.state?.user;
}

export function setUser(user = {}) {
  store.commit('setUser', user)
}
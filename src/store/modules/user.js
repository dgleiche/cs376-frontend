import { resetRouter } from '@/router'
import { userMutations } from '@/store/mutations'

const state = {
  email: '',
  name: '',
  avatar: ''
}

const mutations = {
  [userMutations.SET_EMAIL](state, email) {
    state.email = email
  },
  [userMutations.SET_NAME](state, name) {
    state.name = name
  },
  [userMutations.SET_AVATAR](state, avatar) {
    state.avatar = avatar
  }
}

const actions = {
  // Store the user info
  setInfo({ commit }, user) {
    return new Promise((resolve) => {
      commit(userMutations.SET_EMAIL, user.email)
      commit(userMutations.SET_NAME, user.displayName)
      commit(userMutations.SET_AVATAR, user.photoURL)
      resolve()
    })
  },

  // Clear the key stored user info (email)
  clearEmail({ commit }) {
    return new Promise((resolve) => {
      commit(userMutations.SET_EMAIL, '')
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      resolve()
      // logout(state.token)
      //   .then(() => {
      //     commit('SET_TOKEN', '')
      //     resetRouter()
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

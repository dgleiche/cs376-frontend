import { resetRouter } from '@/router'
import { userMutations } from '@/store/mutations'
import firebase from 'firebase'

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
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit(userMutations.SET_EMAIL, '')
          resetRouter()
          resolve()
        })
        .catch((error) => reject(error))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

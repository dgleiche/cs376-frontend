import { twitterMutations } from '@/store/mutations'

const state = {
  tweetData: []
}

const mutations = {
  [twitterMutations.SET_TWEETS](state, tweetData) {
    state.tweetData = tweetData
  }
}

const actions = {
  // Retrieve the tweets from the firebase db
  getTweets({ commit }) {
    return new Promise((resolve, reject) => {
      commit(twitterMutations.SET_TWEETS, [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

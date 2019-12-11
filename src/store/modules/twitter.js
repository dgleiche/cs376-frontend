import { twitterMutations } from '@/store/mutations'
import firebase from 'firebase'

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
      firebase
        .firestore()
        .collection('elonmusk')
        .doc('tweets')
        .get()
        .then((res) => {
          const tweetData = res.data()
          const tweetArray = Object.keys(tweetData).map((key) => {
            const data = tweetData[key]
            return {
              id: data.id,
              text: data.text,
              score: data.score.compound
            }
          })

          console.log('tweets', tweetArray.length)

          commit(twitterMutations.SET_TWEETS, tweetArray)
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

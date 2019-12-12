import { twitterMutations } from '@/store/mutations'
import firebase from 'firebase'

const state = {
  handles: [],
  handleInfo: {},
  tweetData: {}
}

const mutations = {
  [twitterMutations.SET_HANDLES](state, handles) {
    state.handles = handles
  },
  [twitterMutations.SET_HANDLE_INFO](state, info) {
    state.handleInfo = info
  },
  [twitterMutations.SET_TWEETS](state, payload) {
    state.tweetData[payload.handle] = payload.tweetData
  }
}

const actions = {
  // Retrieve all of the twitter handles currently in the db
  getHandles({ commit }) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('listOfHandles')
        .doc('handles')
        .get()
        .then((res) => {
          const handles = res.data().handles
          commit(twitterMutations.SET_HANDLES, handles)
          resolve()
        })
        .catch((error) => reject(error))
    })
  },
  // Retrieve the account info for a handle
  getInfoForHandle({ commit }, handle) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(handle)
        .doc('info')
        .get()
        .then((res) => {
          const info = res.data()
          commit(twitterMutations.SET_HANDLE_INFO, info)
          resolve()
        })
        .catch((error) => reject(error))
    })
  },
  // Retrieve the tweets from the firebase db
  getTweetsForHandle({ commit }, handle) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(handle)
        .doc('tweets')
        .get()
        .then((res) => {
          let tweetArray = []
          let fetchPromises = []

          const pages = res.data().pages
          pages.forEach((page) => {
            const pagePromise = new Promise((resolve, reject) =>
              res.ref
                .collection(page)
                .doc('data')
                .get()
                .then((tweetRes) => {
                  const tweetData = tweetRes.data()
                  const tweetsForPage = Object.keys(tweetData).map((key) => {
                    const data = tweetData[key]
                    return data
                  })
                  resolve(tweetsForPage)
                })
                .catch((error) => reject(error))
            )

            fetchPromises.push(pagePromise)
          })

          Promise.all(fetchPromises)
            .then((pageTweets) => {
              pageTweets.forEach((pageTweet) => {
                tweetArray = [...tweetArray, ...pageTweet]
              })
              commit(twitterMutations.SET_TWEETS, {
                handle,
                tweetData: tweetArray
              })
              resolve()
            })
            .catch((error) => reject(error))
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

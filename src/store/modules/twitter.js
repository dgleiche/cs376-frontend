import { twitterMutations } from '@/store/mutations'
import firebase from 'firebase'

const state = {
  handles: [],
  tweetData: []
}

const mutations = {
  [twitterMutations.SET_HANDLES](state, handles) {
    state.handles = handles
  },
  [twitterMutations.SET_TWEETS](state, tweetData) {
    state.tweetData = tweetData
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
  // Retrieve the tweets from the firebase db
  getTweets({ commit }) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('elonmusk')
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
                    return {
                      id: data.id,
                      text: data.text,
                      score: data.score.compound
                    }
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
              commit(twitterMutations.SET_TWEETS, tweetArray)
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

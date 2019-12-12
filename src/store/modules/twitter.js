import { twitterMutations } from '@/store/mutations'
import firebase from 'firebase'
import moment from 'moment'

const state = {
  handles: [],
  handleInfo: {},
  processedData: {},
  tweetData: {},
  networkGraphData: {}
}

const mutations = {
  [twitterMutations.SET_HANDLES](state, handles) {
    state.handles = handles
  },
  [twitterMutations.SET_HANDLE_INFO](state, info) {
    state.handleInfo = info
  },
  [twitterMutations.SET_PROCESSED_DATA](state, payload) {
    state.processedData[payload.handle] = payload.data
  },
  [twitterMutations.SET_TWEETS](state, payload) {
    state.tweetData[payload.handle] = payload.tweetData
  },
  [twitterMutations.GET_NETWORK_GRAPH](state, graphData) {
    state.networkGraphData = graphData
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

          if (info && info['Been on twitter since']) {
            info['Been on twitter since'] = moment
              .unix(info['Been on twitter since'].seconds)
              .format('MMMM Do YYYY')
          }
          commit(twitterMutations.SET_HANDLE_INFO, info)
          resolve()
        })
        .catch((error) => reject(error))
    })
  },
  // Retrieve the charts and other data under processed
  getProcessedDataForHandle({ commit }, handle) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection(handle)
        .doc('processed')
        .get()
        .then((res) => {
          const processedData = res.data()
          commit(twitterMutations.SET_PROCESSED_DATA, {
            handle,
            data: processedData
          })
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
                    return tweetData[key]
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
  },
  getNetworkGraphData({ commit }) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection('TwitterNetworkGraph')
        .doc('graph')
        .get()
        .then((res) => {
          const networkGraphData = res.data()
          commit(twitterMutations.GET_NETWORK_GRAPH, networkGraphData)
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

const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  user: (state) => state.user,
  twitterHandles: (state) => state.twitter.handles,
  tweetData: (state) => state.twitter.tweetData
}
export default getters

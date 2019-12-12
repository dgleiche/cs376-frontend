const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  user: (state) => state.user,
  twitterHandles: (state) => state.twitter.handles,
  twitterHandleInfo: (state) => state.twitter.handleInfo,
  twitterHandleProcessedData: (state) => state.twitter.processedData,
  tweetData: (state) => state.twitter.tweetData,
  networkGraphData: (state) => state.twitter.networkGraphData
}
export default getters

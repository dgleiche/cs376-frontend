<template>
  <div class="account-container">
    <h1>Account: @{{ handle }}</h1>
    <h2>Info</h2>
    <template v-if="tweetData[handle] && twitterHandleInfo">
      <div v-for="(value, property) in twitterHandleInfo" :key="property">
        <b>{{ property }}:</b>
        {{ value }}
      </div>
    </template>

    <h2>Processed Data</h2>
    <template v-if="tweetData[handle] && twitterHandleProcessedData">
      <h3>Graphs</h3>

      <toggleable-graph
        graph-title="Top Five Most Popular Responded To"
        :graph-html="
          twitterHandleProcessedData.graphs
            .top_five_most_popular_responded_to_graph.graph
        "
      >
      </toggleable-graph>

      <toggleable-graph
        graph-title="Top Five Responded To"
        :graph-html="
          twitterHandleProcessedData.graphs.top_five_responded_to_graph.graph
        "
      >
      </toggleable-graph>

      <h3>Histograms</h3>

      <toggleable-graph
        graph-title="Likes for Original"
        :graph-html="
          twitterHandleProcessedData.histograms.likes_for_original_histogram
            .graph
        "
      >
      </toggleable-graph>

      <toggleable-graph
        graph-title="Likes for Retweets"
        :graph-html="
          twitterHandleProcessedData.histograms.likes_for_retweets_histogram
            .graph
        "
      ></toggleable-graph>

      <toggleable-graph
        graph-title="Likes with Images"
        :graph-html="
          twitterHandleProcessedData.histograms.likes_with_images_histogram
            .graph
        "
      ></toggleable-graph>

      <toggleable-graph
        graph-title="Likes"
        :graph-html="
          twitterHandleProcessedData.histograms.likes_histogram.graph
        "
      ></toggleable-graph>
    </template>

    <h2>Tweets</h2>
    <div v-if="tweetData[handle]" class="pagination-block">
      <el-pagination
        :current-page.sync="tweetTablePage"
        :page-sizes="tweetTablePageSizes"
        :page-size.sync="tweetTablePageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tweetData[handle].length"
      />
    </div>
    <el-table
      v-loading="loadingTweets"
      :data="tweetsForCurrentPage"
      style="width: 100%"
      :row-style="tweetRowStyle"
    >
      <el-table-column prop="id" label="ID" width="200"></el-table-column>
      <el-table-column prop="text" label="Text"></el-table-column>
      <el-table-column
        prop="score.compound"
        label="Score"
        width="100"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ToggleableGraph from '@/views/handles/account/components/ToggleableGraph'

export default {
  name: 'HandlesAccount',
  components: {
    ToggleableGraph
  },
  data() {
    return {
      handle: this.$route.params.handle,
      loadingTweets: false,
      tweetTablePage: 1,
      tweetTablePageSizes: [10, 30, 50, 100, 200],
      tweetTablePageSize: 10,
      shownGraphs: {
        histograms: {
          likesForOriginal: false,
          likesForRetweet: false,
          likes: false,
          likesWithImages: false
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'twitterHandleInfo',
      'twitterHandleProcessedData',
      'tweetData'
    ]),
    tweetsForCurrentPage() {
      // Subtract one from the current table page to account for zero/one index difference
      const startIndex = this.tweetTablePageSize * (this.tweetTablePage - 1)
      const endIndex = startIndex + this.tweetTablePageSize
      return this.tweetData[this.handle].slice(startIndex, endIndex)
    }
  },
  created() {
    // this.tweetData[this.handle] = []
    this.loadingTweets = true
    this.$store.dispatch('twitter/getTweetsForHandle', this.handle).then(() => {
      this.loadingTweets = false

      this.$store
        .dispatch('twitter/getProcessedDataForHandle', this.handle)
        .then(() => {
          console.log('processed data:', this.twitterHandleProcessedData)
          this.$nextTick().then(() => {
            // const graphRefs = [
            //   this.$refs.likesForOriginalHistogram,
            //   this.$refs.likesForRetweetHistogram
            // ]
            //
            // graphRefs.forEach((ref) => this.executeGraphScript(ref))
          })
        })
    })

    this.$store.dispatch('twitter/getInfoForHandle', this.handle)
  },
  methods: {
    // https://stackoverflow.com/questions/30143082/how-to-get-color-value-from-gradient-by-percentage-with-javascript
    // Calculate the color at a position on a gradient
    scaledColor(c1, c2, w1) {
      const w2 = 1 - w1
      // Calculated colors in [r, g, b]
      return [
        Math.round(c1[0] * w1 + c2[0] * w2),
        Math.round(c1[1] * w1 + c2[1] * w2),
        Math.round(c1[2] * w1 + c2[2] * w2)
      ]
    },
    tweetRowStyle({ row }) {
      let rgb = [0, 0, 0]
      if (row.score.compound < 0) {
        // We are on a scale of blue to red
        const c1 = [255, 0, 0]
        const c2 = [0, 0, 255]
        rgb = this.scaledColor(c1, c2, row.score.compound * -1)
      } else {
        // We are on a scale of blue to green
        const c1 = [0, 255, 0]
        const c2 = [0, 0, 255]
        rgb = this.scaledColor(c1, c2, row.score.compound)
      }

      return {
        background: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.1)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  margin: 30px;
}
</style>

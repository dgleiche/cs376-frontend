<template>
  <div class="account-container">
    <h1>Account: @{{ handle }}</h1>
    <h2>Info</h2>
    <template v-if="tweets && twitterHandleInfo">
      <div v-for="(value, property) in twitterHandleInfo" :key="property">
        <b>{{ property }}:</b>
        {{ value }}
      </div>
    </template>

    <h2>Processed Data</h2>
    <template v-if="processedData">
      <h3>Graphs</h3>
      <div class="chart-wrapper">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="chart-wrapper">
              <h3>Top Five Users Responded To</h3>
              <bar-chart :chart-data="topFive" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div>
              <h3>Top Five Most Popular Users Responded To</h3>
              <bar-chart :chart-data="topFivePopular" />
            </div>
          </el-col>
        </el-row>
        <div>
          <h3>Overall Sentement of Tweets</h3>
          <pie-chart :chart-data="pieChartData" />
        </div>
      </div>

      <!--      <toggleable-graph-->
      <!--        graph-title="Top Five Most Popular Responded To"-->
      <!--        :graph-html="-->
      <!--          processedData.graphs.top_five_most_popular_responded_to_graph.graph-->
      <!--        "-->
      <!--      >-->
      <!--      </toggleable-graph>-->

      <!--      <toggleable-graph-->
      <!--        graph-title="Top Five Responded To"-->
      <!--        :graph-html="processedData.graphs.top_five_responded_to_graph.graph"-->
      <!--      >-->
      <!--      </toggleable-graph>-->

      <h3>Histograms</h3>

      <!--      <toggleable-graph-->
      <!--        graph-title="Likes for Original"-->
      <!--        :graph-html="-->
      <!--          processedData.histograms.likes_for_original_histogram.graph-->
      <!--        "-->
      <!--      >-->
      <!--      </toggleable-graph>-->

      <toggleable-graph
        graph-title="Likes for Retweets"
        :graph-html="
          processedData.histograms.likes_for_retweets_histogram.graph
        "
      ></toggleable-graph>

      <toggleable-graph
        graph-title="Likes with Images"
        :graph-html="processedData.histograms.likes_with_images_histogram.graph"
      ></toggleable-graph>

      <toggleable-graph
        graph-title="Likes"
        :graph-html="processedData.histograms.likes_histogram.graph"
      ></toggleable-graph>
    </template>
    <template v-else>
      Processing...
    </template>

    <h2>Tweets</h2>
    <div v-if="tweets" class="pagination-block">
      <el-pagination
        :current-page.sync="tweetTablePage"
        :page-sizes="tweetTablePageSizes"
        :page-size.sync="tweetTablePageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tweets.length"
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
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'HandlesAccount',
  components: {
    ToggleableGraph,
    PieChart,
    BarChart
  },
  data() {
    return {
      handle: this.$route.params.handle,
      loadingTweets: false,
      tweetTablePage: 1,
      tweetTablePageSizes: [10, 30, 50, 100, 200],
      tweetTablePageSize: 10,
      processedData: {},
      sentementData: {
        labels: [],
        data: []
      },
      topFive: {
        labels: [],
        data: []
      },
      topFivePopular: {
        labels: [],
        data: []
      },
      pieChartData: { title: 'PIE CHART', labels: [], data: [] },
      tweets: []
    }
  },
  computed: {
    ...mapGetters([
      'twitterHandleInfo',
      'twitterHandleProcessedData',
      'tweetData'
    ]),
    tweetsForCurrentPage() {
      if (this.tweets.length === 0) {
        return []
      }

      // Subtract one from the current table page to account for zero/one index difference
      const startIndex = this.tweetTablePageSize * (this.tweetTablePage - 1)
      const endIndex = startIndex + this.tweetTablePageSize
      return this.tweets.slice(startIndex, endIndex)
    }
  },
  created() {
    // this.tweetData[this.handle] = []
    this.loadingTweets = true
    this.$store
      .dispatch('twitter/getTweetsForHandle', this.handle)
      .then(() => {
        this.loadingTweets = false
        this.tweets = this.tweetData[this.handle]

        this.$store
          .dispatch('twitter/getProcessedDataForHandle', this.handle)
          .then(() => {
            this.processedData = this.twitterHandleProcessedData[this.handle]
            this.sentementData.data = [
              this.processedData.sentiment.negativeC,
              this.processedData.sentiment.neutralC,
              this.processedData.sentiment.positiveC
            ]
            this.pieChartData.labels = ['Negative', 'Neutral', 'Positive']
            this.pieChartData.data = [
              {
                value: this.processedData.sentiment.negativeC,
                name: 'Negative'
              },
              {
                value: this.processedData.sentiment.neutralC,
                name: 'Neutral'
              },
              {
                value: this.processedData.sentiment.positiveC,
                name: 'Positive'
              }
            ]
            console.log(this.processedData)
            this.topFivePopular = {
              labels: this.processedData.graphs
                .top_five_most_popular_responded_to_graph.labels,
              data: this.processedData.graphs
                .top_five_most_popular_responded_to_graph.data
            }
            this.topFive = {
              labels: this.processedData.graphs.top_five_responded_to_graph
                .labels,
              data: this.processedData.graphs.top_five_responded_to_graph.data
            }

            console.log(this.pieChartData)
          })
      })
      .catch((error) => console.log('error:', error))

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

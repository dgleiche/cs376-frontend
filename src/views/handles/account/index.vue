<template>
  <div class="account-container">
    <h1>Account: @{{ handle }}</h1>
    <h2>Info</h2>
    <div v-for="(value, property) in twitterHandleInfo" :key="value">
      <b>{{ property }}:</b>
      {{ value }}
    </div>

    <h2>Tweets</h2>
    <p><b>Number of tweets:</b> {{ tweetData[handle].length }}</p>
    <el-table
      v-loading="loadingTweets"
      :data="tweetData[handle]"
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

export default {
  name: 'HandlesAccount',
  data() {
    return {
      handle: this.$route.params.handle,
      loadingTweets: false
    }
  },
  computed: {
    ...mapGetters(['twitterHandleInfo', 'tweetData'])
  },
  created() {
    this.loadingTweets = true
    this.$store.dispatch('twitter/getTweetsForHandle', this.handle).then(() => {
      this.loadingTweets = false
      console.log('tweets:', this.tweetData[this.handle].length)
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

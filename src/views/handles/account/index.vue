<template>
  <div class="account-container">
    <h1>Account: {{ handle }}</h1>
    <h2>Info</h2>

    <h2>Tweets</h2>
    <el-table
      v-loading="loadingTweets"
      :data="tweetData[handle]"
      style="width: 100%"
      :row-style="tweetRowStyle"
    >
      <el-table-column prop="id" label="ID" width="200"></el-table-column>
      <el-table-column prop="text" label="Text"></el-table-column>
      <el-table-column prop="score" label="Score" width="100"></el-table-column>
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
    ...mapGetters(['tweetData'])
  },
  created() {
    this.loadingTweets = true
    this.$store.dispatch('twitter/getTweetsForHandle', this.handle).then(() => {
      this.loadingTweets = false
      console.log('tweets:', this.tweetData[this.handle].length)
    })
  },
  methods: {
    // https://stackoverflow.com/questions/30143082/how-to-get-color-value-from-gradient-by-percentage-with-javascript
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
      if (row.score < 0) {
        // We are on a scale of blue to red
        const c1 = [255, 0, 0]
        const c2 = [0, 0, 255]
        rgb = this.scaledColor(c1, c2, row.score * -1)
      } else {
        // We are on a scale of blue to green
        const c1 = [0, 255, 0]
        const c2 = [0, 0, 255]
        rgb = this.scaledColor(c1, c2, row.score)
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
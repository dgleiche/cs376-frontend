<!-- NOTE: THIS IS HARDCODED RIGHT NOW FOR ELON MUSK -->
<template>
  <div class="dashboard-container">
    <el-table
      v-loading="loading"
      :data="tweetData.elonmusk"
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
  name: 'Dashboard',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user', 'tweetData'])
  },
  created() {
    this.loading = true
    this.$store
      .dispatch('twitter/getTweetsForHandle', 'elonmusk')
      .then(() => {
        this.loading = false
        console.log(`loaded ${this.tweetData.elonmusk.length} tweets`)
      })
      .catch((error) => {
        this.loading = false
        console.log('Error fetching tweets:', error.message)
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
.dashboard-container {
  margin: 30px;
}
</style>

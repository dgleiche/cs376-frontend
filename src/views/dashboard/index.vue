<!-- NOTE: THIS IS HARDCODED RIGHT NOW FOR ELON MUSK -->
<template>
  <div class="dashboard-container"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import Graph from '@/views/dashboard/components/Graph'
export default {
  name: 'Dashboard',
  components: {
    Graph
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters(['user', 'tweetData', 'networkGraphData'])
  },
  created() {
    this.loading = true

    this.$store.dispatch('twitter/getNetworkGraphData').then(() => {
      console.log('net graph data:', this.networkGraphData)
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
.graphCanvas {
  height: 1000px;
}
</style>

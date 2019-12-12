<!-- NOTE: THIS IS HARDCODED RIGHT NOW FOR ELON MUSK -->
<template>
  <div class="dashboard-container">
    <template v-if="graphData">
      <graph :nodes="graphData.nodes" :edges="graphData.edges"></graph>
    </template>
    <template v-else>
      Loading graph...
    </template>
  </div>
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
      graphData: null
    }
  },
  computed: {
    ...mapGetters(['networkGraphData'])
  },
  created() {
    this.$store.dispatch('twitter/getNetworkGraphData').then(() => {
      this.graphData = this.networkGraphData
    })
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

<template>
  <div id="graph">
    <d3-network :net-nodes="nodes" :net-links="links" :options="options">
    </d3-network>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'

// jsnx._prototype.d3 = d3
export default {
  name: 'Graph',
  components: {
    D3Network
  },
  props: {
    nodes: {
      type: Array,
      required: true
    },
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: {
        force: 900,
        nodeSize: 20,
        size: {
          h: 800
        },
        nodeLabels: true,
        linkWidth: 5,
        canvas: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.graph {
  width: 100%;
  height: 100%;
}
.canvas-dev {
  width: 100%;
  height: 500px;
}
</style>

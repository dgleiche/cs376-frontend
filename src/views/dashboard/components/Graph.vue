<template>
  <div id="graph">
    <d3-network
      :net-nodes="nodes"
      :net-links="links"
      :options="options"
      @node-click="clickedNode"
    >
    </d3-network>

    <el-dialog :title="popup.title" :visible.sync="popup.visible">
      <template v-if="popup.info">
        <div v-for="(value, property) in popup.info" :key="property">
          <b>{{ property }}:</b>
          {{ value }}
          <br />
          <br />
        </div>
      </template>
      <template v-else>
        No information has been retrieved for this account yet.
      </template>
    </el-dialog>
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
      popup: {
        visible: false,
        title: '',
        info: null
      },
      options: {
        force: 900,
        nodeSize: 20,
        size: {
          h: 1000
        },
        nodeLabels: true,
        linkWidth: 5,
        canvas: false
      }
    }
  },
  methods: {
    clickedNode(e, node) {
      const handle = node.name
      this.$store.dispatch('twitter/getInfoForHandle', handle).then(() => {
        this.popup.title = `Info for @${handle}`
        this.popup.info = this.$store.state.twitter.handleInfo
        this.popup.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.graph {
  width: 100%;
  height: 1500px;
}
.canvas-dev {
  width: 100%;
  height: 500px;
}
</style>

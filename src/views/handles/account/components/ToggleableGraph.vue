<template>
  <div class="toggleable-graph-container">
    <h4 class="graph-header" @click="show = !show">
      {{ graphTitle }}
      <span class="show-graph-button">
        <template v-if="show">
          &or;
        </template>
        <template v-else>
          >
        </template>
      </span>
    </h4>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-show="show" ref="graph" v-html="graphHtml" />
  </div>
</template>

<script>
export default {
  name: 'ToggleableGraph',
  props: {
    graphTitle: {
      type: String,
      required: true
    },
    graphHtml: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    graphHtml(newVal) {
      if (newVal) {
        this.executeGraphScript(this.$refs.graph)
      }
    }
  },
  mounted() {
    this.executeGraphScript(this.$refs.graph)
  },
  methods: {
    executeGraphScript(ref) {
      ref.childNodes.forEach((node) => {
        if (node.nodeName === 'SCRIPT') {
          const script = node.outerText
          eval(script)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toggleable-graph-container {
  .graph-header {
    cursor: pointer;
  }

  .show-graph-button {
    color: blue;
    padding: 5px;
  }
}
</style>

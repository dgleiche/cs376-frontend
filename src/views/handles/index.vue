<template>
  <div class="handles-container">
    <h1>Handles</h1>
    <ul>
      <li v-for="handle in twitterHandles" :key="handle">
        {{ handle }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Handles',
  computed: {
    ...mapGetters(['twitterHandles'])
  },
  created() {
    this.$store.dispatch('twitter/getHandles')
  }
}
</script>

<style lang="scss" scoped>
.handles-container {
  margin: 30px;
}
</style>

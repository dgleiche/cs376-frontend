<template>
  <div class="account-container">
    <h1>Account Info for {{ handle }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HandlesAccount',
  data() {
    return {
      handle: this.$route.params.handle
    }
  },
  created() {
    this.$store.dispatch('getTweetsForHandle', this.handle)
  }
}
</script>

<style lang="scss" scoped>
.account-container {
  margin: 30px;
}
</style>

<template>
  <div class="dashboard-container">
    <el-table :data="tweetData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="text" label="Text"></el-table-column>
      <el-table-column prop="score" label="Score"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      tweetData: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
}
</style>

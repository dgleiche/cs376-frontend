<template>
  <div class="handles-container">
    <!-- Form for requesting new handles -->
    <el-form
      ref="request-handle-form"
      :model="handleForm"
      :inline="true"
      @submit.prevent="handleNewAccount"
    >
      <el-form-item label="Parse New Handle:">
        <el-input
          v-model="handleForm.handle"
          placeholder="elonmusk..."
          @keydown.enter.prevent="handleNewAccount"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleNewAccount">
          Go
        </el-button>
      </el-form-item>
    </el-form>
    <h2>Parsed Handles</h2>
    <ul>
      <li v-for="handle in twitterHandles" :key="handle">
        <router-link :to="`/handles/${handle}`">{{ handle }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Handles',
  data() {
    return {
      handleForm: {
        handle: ''
      }
    }
  },
  computed: {
    ...mapGetters(['twitterHandles'])
  },
  created() {
    this.$store.dispatch('twitter/getHandles')
  },
  methods: {
    handleNewAccount() {
      console.log('Parse:', this.handleForm.handle)
    }
  }
}
</script>

<style lang="scss" scoped>
.handles-container {
  margin: 30px;
}
</style>

<template>
  <div>
    <el-button type="primary" size="default"  v-show="$store.state.user.buttons.indexOf('btn.1')!=-1">按钮1</el-button>
    <el-button type="primary" size="default"  v-show="$store.state.user.buttons.indexOf('btn.2')!=-1">按钮2</el-button>
  </div>
</template>

<script>
export default {
  name:'',
  data () {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
</style>

<template>
  <div>
    <el-button type="primary" size="default" v-show="$store.state.user.buttons.indexOf('btn.blue')!=-1">蓝色按钮</el-button>
    <el-button type="danger" size="default" v-show="$store.state.user.buttons.indexOf('btn.red')!=-1">红色按钮</el-button>
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

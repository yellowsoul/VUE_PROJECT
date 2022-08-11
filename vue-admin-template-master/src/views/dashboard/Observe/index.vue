<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Serach></Serach>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Serach from "./Search";
import Category from "./Category";
export default {
  name: "",
  components: {
    Serach,
    Category,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>

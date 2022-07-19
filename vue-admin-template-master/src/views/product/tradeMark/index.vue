<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0">添加</el-button>
    <!-- 
      表格组件 
      data:表格组件将来需要展示的数据----数组类型
      border:是给表格添加边框
      column:属性
      label:显示的标题
      width:对应列的宽度
      aling:标题的对齐方式
    -->
    <el-table style="width:100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width"></el-table-column>
    </el-table>
    
    <!-- 
      分页器
      当前第几页、数据总条数、每一页展示条数、连续页码数
      @size-change="sizeChange"
      @current-change="currentChange"

      current-page:代表的是当前第几页
      total：代码分页器一共需要展示数据条数
      page-size：代表的是每一页需要展示多少条数据
      page-sizes：代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
      page-count:按钮的数量  如果 9 连续页码是7
    -->
    <el-pagination
      style="margin-top:20px;text-align: center;"
      :current-page="6"
      :total="99"
      :page-size="3"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,sizes, total"
    >
    </el-pagination>
    
    
    
  </div>
</template>

<script>
export default {
  name: 'tradeMark',
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped>
</style>

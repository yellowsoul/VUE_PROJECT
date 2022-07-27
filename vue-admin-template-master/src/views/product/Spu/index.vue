<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 三级联动已经是全局组件了 -->
      <category-select
        @getCategoryId="getCategoryId"
        :show="!show"
      ></category-select>
    </el-card>

    <el-card>
      <!-- 底部这里将来是有三部分进行切换 -->
      <div>
        <!-- 展示SPU列表的结构 -->
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 这里的按钮将来用hintButton替换 -->
                <el-button type="success" icon="el-icon-plus" size="mini"></el-button>
                <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                <el-button type="info" icon="el-icon-info" size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 
          @size-change="sizeChange"
          @current-change="currentChange"
        -->
        <el-pagination
          style="text-align:center"
          :current-page="6"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="23">
        
        </el-pagination>
        
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      // 分别是分类的ID
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      show: true,
    };
  },
  methods: {
    // 三级联动的自定义事件，可以把子组件的相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      // categoryId：可以获取一、二、三级分类的id   level,为了区分是几级id
      if (level == 1) {
        this.category1Id = categoryId;
        // 清除2、3级分类的id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        // 清除3级分类的id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 获取SPU列表数据进行展示
        this.getSpuList();
      }
    },

    // 获取SPU列表数据的方法
    getSpuList() {},
  },
};
</script>

<style scoped>
</style>

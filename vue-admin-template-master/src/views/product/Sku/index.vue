<template>
  <div>
    <!-- 表格 -->
    <el-table :data="records" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{row, $index}">
          <img :src="row.skuDefaultImg" style="width:80px;height:80px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row, $index}">
          <el-button type="warning" icon="el-icon-sort-down" size="mini"></el-button>
          <el-button type="success" icon="el-icon-sort-up" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="getSkuList"
      @size-change="sizeChange"
      style="text-align:center;"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->,sizes, total"
      :total="total">
    </el-pagination>
    
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page:1, // 代表当前第几页
      limit:10, // 代表当前页面有几条数据
      records:[], // 存储Sku列表的数据
      total:0, // 存储分页器一共展示的数据
    };
  },

  // 组件挂载完毕
  mounted(){
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据的方法
    async getSkuList(pages = 1){
      this.page = pages;
      // 解构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page,limit);
      if(result.code == 200){
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },

    // 每页显示条数
    sizeChange(limit){
      // 修改参数
      this.limit = limit;
      this.getSkuList();
    }

  },
};
</script>

<style scoped>
</style>

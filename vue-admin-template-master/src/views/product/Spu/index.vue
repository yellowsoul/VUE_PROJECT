<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 三级联动已经是全局组件了 -->
      <category-select
        @getCategoryId="getCategoryId"
        :show="scene != 0"
      ></category-select>
    </el-card>

    <el-card>
      <!-- 底部这里将来是有三部分进行切换 -->
      <div v-show="scene == 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
        >添加SPU</el-button>
        <el-table border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里的按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 
          
          
        -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="sizeChange"
        >
        </el-pagination>
      </div>
      <!-- 子组件SPU -->
      <spu-form
        v-show="scene == 1"
        ref="spu"
        @changeScene="changeScene"
      ></spu-form>
      <!-- 子组件SKU -->
      <sku-form v-show="scene == 2" ref="sku" @changeScenes="changeScenes"></sku-form>

      <!-- 查看SPU下的SKU列表弹窗 -->
      <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible">
        <!-- table展示sku的列表 -->
        <el-table :data="skuList" style="width:100%;" border>
          <el-table-column  prop="skuName" label="名称" width="width">
            
          </el-table-column>
          <el-table-column  prop="price" label="价格" width="width">
            
          </el-table-column>
          <el-table-column  prop="weight" label="重量" width="width">
            
          </el-table-column>
          <el-table-column label="默认图片" width="width">
            <template slot-scope="{row, $index}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
            </template>
          </el-table-column>
        </el-table>
        
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      // 分别是分类的ID
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      // show: true,

      page: 1, // 分页器当前第几页
      limit: 3, // 每一页需要展示多少条数据
      records: [], // spu列表的数据
      total: 0, // 分页器一共需要展示数据的条数

      scene: 0, // 代表展示SPU列表数据   1 添加SPU|修改SPU   2添加SKU
      // 控制对话框显示与隐藏
      dialogTableVisible:false,
      spu:{},
      skuList:[], // 存储的是SKU列表的数据
    };
  },
  methods: {
    // 点击分页器的第几页按钮的回调
    // currentChange(page){
    //   this.page = page;
    //   this.getSpuList();
    // },

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
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      // 携带三个参数:page 第几页 limit 每一页需要展示多少条数据  三级分类的id
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },

    // 当分页器的某一页展示数据的条数发生变化的回调
    sizeChange(limit) {
      // 修改参数
      this.limit = limit;
      // 发送请求
      this.getSpuList();
    },

    // 添加SPU按钮的回调
    addSpu() {
      this.scene = 1;
      // 通知子组件SpuForm发请求---两个
      this.$refs.spu.addSpuData(this.category3Id);
    },

    // 修改某一个SPU
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件SpuForm子组件
      // 在父组件当中可以通过$ref获取子组件等等
      this.$refs.spu.initSpuData(row);
    },

    // 自定义事件回调(SpuForm)
    changeScene({ scene, flag }) {
      // flag这个形参为了区分保存按钮是添加还是修改
      // 切换结构（场景）
      this.scene = scene;
      if (flag == "修改") {
        // 子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示，并停留在当前页
        this.getSpuList(this.page);
      } else {
        // 子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示，并回到默认第一页
        this.getSpuList();
      }
    },

    // 删除SPU的回调
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        // 代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },



    /** 
     * scene：2 添加SKU
     *  */

    // 添加SKU按钮的回调
    addSku(row){
      // 切换场景为2
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求----三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },

    // skuForm通知父组件修改场景
    changeScenes(scene){
      this.scene = scene;
    },

    // 查看SKU的按钮的回调
    async handler(spu){
      // 保存SPU信息
      this.spu = spu;
      // 点击这个按钮的时候，对话框可见的
      this.dialogTableVisible = true;
      // 获取sku列表的数据进行展示
      let result = await this.$API.spu.reqSkuList(spu.id);
      if(result.code == 200){
        this.skuList = result.data;
      }
    },
  },

  // 组件挂载完毕
  mounted() {},
};
</script>

<style scoped>
</style>

<template>
  <div>
    <el-card style="margin: 20px 0">
      <category-select @getCategoryId="getCategoryId"></category-select>
    </el-card>

    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格：展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 5px 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-puls" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>

        <el-table style="width: 100%; margin: 20px 0" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column width="width" prop="prop" label="属性值名称">
            <template slot-scope="{row, $index}">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="width" prop="prop" label="操作">
            <template slot-scope="{row, $index}">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的字段
      attrList: [],
      // 这个属性是控制table表格显示与隐藏的
      isShowTable: true,
      // 收集新增属性|修改属性使用的
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [ // 属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId、valueName
          // {
          //   attrId: 0, // 相应的属性名的id
          //   valueName: "",
          // },
        ],
        categoryId:0, // 三级分类的id
        categoryLevel: 3, // 因为服务器也需要区分几级id
      },
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({ categoryId, level }) {
      console.log(level);
      // 区分三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 代表三级分类的id有了
        this.category3Id = categoryId;
        // 发请求获取平台属性的数据
        this.getAttrList();
      }
    },

    // 获取平台属性的数据
    // 当用用户确定三级分类的数据时候，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    // 添加属性值回调
    addAttrValue(){
      // 向属性值的数组里面添加元素
      // attrId：是你相应的属性的id，目前而言我们是添加属性的操作，还没有相应的属性id，目前而言带给服务器的id为undefined
      // valueName：相应的属性值的名称
      this.attrInfo.attrValueList.push({
        attrId:undefined,
        valueName:''
      })
    },

    // 添加属性按钮的回调
    addAttr(){
      // 切换table显示与隐藏
      this.isShowTable = false;
      // 清除数据
      // 收集三级列表id
      this.attrInfo = {
        attrName:'', // 属性名
        attrValueList:[
          // 属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId、valueName
        ],
        categoryId:this.category3Id, // 三级分类的id
        categoryLevel: 3, // 因为服务器也需要区分几级id
      }
    },

    // 修改某一个属性
    updateAttr(row){
      // isShowTable变为false
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      // 由于数据结构当中存在对象里面套数组，数组里面又套对象，因此需要使用深拷贝解决这类问题
      // 深拷贝，浅拷贝在面试的时候出现频率很高，切记达到手写深拷贝与浅拷贝
      this.attrInfo = cloneDeep(row);
    },
  },
};
</script>

<style scoped>
</style>

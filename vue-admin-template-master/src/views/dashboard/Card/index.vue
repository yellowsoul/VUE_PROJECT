<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个card -->
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <span>周同比&nbsp;&nbsp;56.67% <svg t="1660050195423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4732" width="16" height="16"><path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="4733" fill="#d81e06"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96% <svg t="1660050265699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5727" width="16" height="16"><path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="5728" fill="#1afa29"></path></svg></span>
            </template>
            <template slot="footer">
              <span>日销售额￥12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个card -->
          <Detail title="访问量" count="88460">
            <template slot="footer">
              <span>日销访问量1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个card -->
          <Detail title="支付笔数" count="88460">
            <template slot="footer">
              <span>转化率64%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个card -->
          <Detail title="运营活动效果" count="78%">
            <template slot="footer">
              <span>周同比&nbsp;&nbsp;56.67% <svg t="1660050195423" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4732" width="16" height="16"><path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="4733" fill="#d81e06"></path></svg></span>
              &nbsp;&nbsp;
              <span>日同比&nbsp;&nbsp;19.96% <svg t="1660050265699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5727" width="16" height="16"><path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="5728" fill="#1afa29"></path></svg></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import Detail from './Detail'
export default {
  name:'Card',
  components:{
    Detail
  },
  data () {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
</style>

<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="header clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="rank">
      <el-row>
        <el-col :span="16">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="8">
          <h3 class="title">门店{{title}}排名</h3>
          <ul>
            <li>
              <span class="num on">1</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num on">2</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num on">3</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num">4</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num">5</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num">6</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num">7</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
            <li>
              <span class="num">8</span>
              <span>肯德基</span>
              <span class="val">1234</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "",
  data() {
    return {
      activeName: "sale",
      mycharts:null,
      // 收集日历数据
      date:[]
    };
  },
  mounted() {
    // 初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.mycharts.setOption({
      title:{
        text:this.title+"趋势"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月","十月","十一月","十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,110,98,167,123,44],
          color:"skyBlue"
        },
      ],
    });
  },
  computed:{
    // 计算属性-标题
    title(){
      return this.activeName == 'sale' ? '销售额' : '访问量'
    }
  },
  // 监听属性
  watch:{
    title(){
      // 重新修改图表配置数据
      // 图表配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
      this.mycharts.setOption({
        title:{
          text:this.title +"趋势"
        }
      })
    }
  },
  methods: {
    // 今日
    setDay(){
      const day = dayjs().format('YYYY-MM-DD');
      this.date = [day,day]
    },
    // 本周
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD');
      const end = dayjs().day(7).format('YYYY-MM-DD');
      this.date = [start,end]
    },
    // 本月
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD');
      const end = dayjs().endOf('month').format('YYYY-MM-DD');
      this.date = [start,end]
    },
    // 本年
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD');
      const end = dayjs().endOf('year').format('YYYY-MM-DD');
      this.date = [start,end]
    }
  },
};
</script>

<style scoped>
/deep/.el-card__header{
  border-bottom:none !important;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.date {
  width: 250px;
  margin: 0 20px;
}

.charts {
  width: 100%;
  height: 300px;
}

.rank .title{margin:0;}
.rank ul{
  list-style: none;
  width:100%;
  height:300px;
  padding:0;
}
.rank li{
  height:8%;
  margin:10px 0;
}
.rank  span{
  margin:0 10px;
}
.rank .num{
  float:left;
  width:20px;
  height:20px;
  border-radius:50%;

  text-align: center;
}
.rank .num.on{
  background-color:black;
  color:white;
}
.rank .val{
  float: right;
}
</style>

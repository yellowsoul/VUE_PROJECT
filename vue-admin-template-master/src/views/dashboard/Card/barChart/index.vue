<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          // 图表的形式-柱状图
          type: "bar",
          smooth: true, // 设置折线平滑效果
          data: [10, 7, 33, 12, 48, 9,29,10,44,33,22,8],
          color:'skyblue'
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip:{}
    });
  },
  methods: {},
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>

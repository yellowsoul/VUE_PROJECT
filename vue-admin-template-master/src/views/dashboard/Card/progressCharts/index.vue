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
        // 最小值与最大值的设置
        min:0,
        max:100
      },
      yAxis: {
        // 隐藏y轴
        show: false,
        // 均分
        type: "category",
      },
      // 系列
      series: [
        {
          // 图表的形式-柱状图
          type: "bar",
          smooth: true, // 设置折线平滑效果
          data: [78],
          color:'yellowgreen',
          // 柱状图的宽度
          barWidth:10,
          // 背景颜色的设置
          showBackground:true,
          // 设置背景颜色
          backgroundStyle:{
            color:"#eee"
          },
          // 文本标签
          label:{
            show:true,
            // 改变文本内容
            formatter:"|",
            // 文本标签位置调试
            position:'right'
          }
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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

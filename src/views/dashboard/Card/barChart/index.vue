<template>
  <div class="barChart" ref="barChart">柱状图</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barChart",
  mounted() {
    let barChart = echarts.init(this.$refs.barChart);
    barChart.setOption({
      xAxis: {
        show: false,
        // 均分
        type:"category",
      },
      yAxis: {
        show: false,
      },
      series: {
        type:"bar",
        data:[45, 55, 26, 45, 30, 45, 88, 65,66,99,54],
        color:"cyan"
      },
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
};
</script>

<style scoped>
.barChart{
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div class="chart" ref="Chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Chart",
  mounted() {
    let chart = echarts.init(this.$refs.Chart);
    chart.setOption({
      xAxis: {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      },
      yAxis: {
        type: "value",
      },
      title:{
          text:"销售额趋势"
      },
    // 系列配置
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130,200,450,200,166,120],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    //   布局配置
      grid:{
          show:true,
          left:50,
          bottom:50
      },
    //   显示信息
    tooltip:{}
    });
  },
};
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div class="progressChart" ref="progressChart">我是进度条</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressChart",
  mounted() {
    let progressChart = echarts.init(this.$refs.progressChart);
    progressChart.setOption({
      xAxis: {
        show: false,
        //  最小值与最大值
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: {
        type: "bar",
        data: [78],
        color: "cyan",
        // 柱状图的宽度
        barWidth: 15,
        color: "yellowgreen",
        // 展示和设置背景颜色
        showBackground: true,
        backgroundStyle: {
          color: "#b2bec3",
        },
        // 展示文本标签
        label:{
            show:true,
            formatter:"|",
            position:"insideRight",
            color:"#f53b57",
            padding:0
        }
      },
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        tooltip:true
      },
    });
  },
};
</script>

<style scoped>
.progressChart {
  width: 100%;
  height: 100%;
}
</style>
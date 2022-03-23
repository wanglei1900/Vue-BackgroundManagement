<template>
  <div class="lineChart" ref="lineChart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "lineChart",
  data() {
    return {
      lineChart:null,
    }
  },
  props:['visitTrend'],
  mounted() {
    this.lineChart = echarts.init(this.$refs.lineChart);
    this.lineChart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      // 系列
      series: {
        type: "line",
        smooth: true,
        // 动态引入父组件传来的访问数据量
        data: [],
        // 拐点样式设置
        itemStyle: {
          opacity: 0,
        },
        // 线条颜色
        lineStyle: {
          color: "purple",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#a29bfe", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#fff", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      // 布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
  watch:{
    visitTrend(){
      this.lineChart.setOption({
        series: {
          data:this.visitTrend
        }
      })
    }
  }
};
</script>

<style scoped>
.lineChart {
  width: 100%;
  height: 100%;
}
</style>
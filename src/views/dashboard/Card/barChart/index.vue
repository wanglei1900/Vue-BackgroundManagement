<template>
  <div class="barChart" ref="barChart">柱状图</div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barChart",
  data() {
    return {
      barChart:null,
    }
  },
  props:['payTrend'],
  mounted() {
    this.barChart = echarts.init(this.$refs.barChart);
    this.barChart.setOption({
      xAxis: {
        show: false,
        // 均分
        type:"category",
      },
      yAxis: {
        show: false,
      },
      series: [{
        type:"bar",
        // 动态引入父组件出传来的数据
        data:[],
        color:"cyan"
      }],
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
  watch: {
    payTrend(){
      this.barChart.setOption({
        series: {
          data:this.payTrend
        }
      })
    }
  },
};
</script>

<style scoped>
.barChart{
  height: 100%;
  width: 100%;
}
</style>
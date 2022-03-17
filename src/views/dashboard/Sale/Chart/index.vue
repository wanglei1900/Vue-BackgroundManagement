<template>
  <div class="chart" ref="Chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Chart",
  data() {
    return {
      eventName:''
    }
  },
  methods: {
    // 向父组件提供数据
    /* clickEvent (){
      console.log(11);
    } */
  },
  mounted() {
    let chart = echarts.init(this.$refs.Chart);
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: "value",
      },
      title:{
          text:'销售量趋势'
      },
    // 系列配置
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130,200,450,200,166,120],
          type: "bar",
          // showBackground: true,
          // backgroundStyle: {
          //   color: "rgba(180, 180, 180, 0.2)",
          // },
        },
      ],
    //   布局配置
      grid:{
          // show:true,
          left:50,
          bottom:50,
          containLabel: true
      },
    });
    
    this.$bus.$on('clickEvent', (name)=>{
      this.eventName = name
      this.eventName==="sale"?this.chart.title.text = '销售量趋势':this.chart.title.text ='访问量趋势'
    })

  },
};
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
<template>
  <div class="chart" ref="Chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";

export default {
  name: "Chart",
  data() {
    return {
      eventName: "",
      // 将echarts实例绑定为响应式数据，以便可以全局调用他
      chart: null,
    };
  },
  mounted() {
    //输入函数体
    this.chart = echarts.init(this.$refs.Chart);
    this.chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
      },
      title: {
        text: "销售额趋势",
      },
      // 系列配置
      series: [
        {
          data: [],
          type: "bar",
        },
      ],
      //   布局配置
      grid: {
        // show:true,
        left: 50,
        bottom: 50,
        containLabel: true,
      },
    });
    // 展示默认数据，不能在这里直接调用函数，因为异步操作接口数据可能还没返回图标就渲染完了
    // this.getChartInfo()
    // 接收sale组件的通知，获取柱状图表格数据
    this.$bus.$on("clickEvent", this.getChartInfo);
  },
  methods: {
    getChartInfo(name ="sale") {
      name == "sale" ? (this.eventName = "销售量"): (this.eventName = "访问量");
      // 注意这里的动态数据涉及到异步操作，所以还需要watch中检测saleChartInfo 加载。
      this.chart.setOption({
        title: { text: this.eventName + "趋势" },
        xAxis: {
          data: name == "sale"? this.saleChartInfo.orderFullYearAxis: this.saleChartInfo.userFullYearAxis,
        },
        series: {
          data: name == "sale"? this.saleChartInfo.orderFullYear: this.saleChartInfo.userFullYear,
        },
      });

    },
  },
  watch: {
    // 检测返回的数据saleChartInfo，首次加载才能渲染到数据
    saleChartInfo(){
      this.getChartInfo()
    }
  },
  computed: {
    // 映射仓库数据
    ...mapState("homeStore", ["saleChartInfo"]),
  },
};
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
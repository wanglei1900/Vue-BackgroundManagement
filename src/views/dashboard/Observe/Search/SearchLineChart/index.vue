<template>
  <div class="all">
    <div class="header">
      <span class="title">{{ title }}</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="body">
      <div>
        <span class="amount">{{ number }}</span>
        <span>{{ percentage }}</span>
        <svg
          t="1647702652412"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2813"
          width="16"
          height="16"
        >
          <path
            d="M426.752 344.149333v554.666667c0 23.68 19.285333 42.666667 43.093333 42.666667h84.48a42.666667 42.666667 0 0 0 43.093334-42.666667v-554.666667h84.949333c47.232 0 62.805333-30.549333 34.56-68.266666l-153.642667-204.8c-28.501333-37.973333-74.112-37.717333-102.4 0l-153.6 204.8c-28.501333 37.973333-12.8 68.266667 34.517334 68.266666h84.949333z"
            fill="#d81e06"
            p-id="2814"
          ></path>
        </svg>
        <svg
          t="1647702713338"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3047"
          width="16"
          height="16"
        >
          <path
            d="M597.333333 640V85.333333c0-23.68-19.285333-42.666667-43.093333-42.666666h-84.48A42.666667 42.666667 0 0 0 426.666667 85.333333v554.666667H341.717333c-47.232 0-62.805333 30.549333-34.56 68.266667l153.642667 204.8c28.501333 37.973333 74.112 37.717333 102.4 0l153.6-204.8c28.501333-37.973333 12.8-68.266667-34.517333-68.266667H597.333333z"
            fill="#1afa29"
            p-id="3048"
          ></path>
        </svg>
      </div>
    </div>
    <div class="footer" ref="lineChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "SearchLineChart",
  props: ["title", "number", "percentage"],
  mounted() {
    let myChart = echarts.init(this.$refs.lineChart)
    myChart.setOption({
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
        data: [45, 55, 45,35,86, 45, 30, 45, 88, 65, 14],
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
  }
}
</script>

<style scoped>
.all {
  color: #7f8c8d;
}
.body {
  padding: 0 5px;
  margin: 20px 0;
}
.title {
  font-size: 20px;
  margin-right: 20px;
}
.amount {
  font-size: 32px;
  color: black;
  margin-right: 50px;
}
.footer {
  height: 100px;
}
</style>
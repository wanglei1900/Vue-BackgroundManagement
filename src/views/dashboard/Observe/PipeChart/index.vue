<template>
  <el-card>
    <div slot="header" class="header">
      <div>销售额类占比</div>
      <el-radio-group v-model="saleChannel">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="pipeChart" ref="pipeChart"></div>
  </el-card>
</template>

<script>
import * as echart from "echarts";

export default {
  name: "PipeChart",
  data() {
    return {
      // 收集销售渠道
      saleChannel: "全部渠道",
    };
  },
  mounted() {
    let myEchart = echart.init(this.$refs.pipeChart);
    myEchart.setOption({
      tooltip: {
        trigger: "item",
      },
      // 顶部铭文不需要
      /* legend: {
        top: "5%",
        left: "center",
      }, */
      title:{
        show:true,
        text:"搜索引擎",
        subtext:"1048",
        left:"center",
        bottom:"center"
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.pipeChart {
  width: 100%;
  height: 300px;
}
</style>
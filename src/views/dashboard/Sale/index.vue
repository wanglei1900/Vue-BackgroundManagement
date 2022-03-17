<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- 头部左侧 -->
        <el-tabs class="tab" v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本年</span>
          <span>本月</span>
          <!-- v-model="value1" -->
          <el-date-picker
            class="date-picker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </div>
      </div>

      <!-- 底部 -->
      <el-row :gutter="30">
        <el-col :span="18" class="chart">
          <!-- 左侧表格 -->
          <Chart></Chart>
        </el-col>
        <el-col :span="6">
          <!-- 右侧排行榜 -->
          <Ranking></Ranking>
        </el-col>
      </el-row>
      <div></div>
    </el-card>
  </div>
</template>

<script>
import Chart from "@/views/dashboard/Sale/Chart";
import Ranking from "@/views/dashboard/Sale/Ranking";

export default {
  name: "Sale",
  components: { Chart, Ranking },
  data() {
    return {
      activeName:'sale'
    }
  },
  methods: {
    // tab标签点击事件
    handleClick (){
      // 通知子组件chart修改数据
      this.$bus.$emit('clickEvent', this.activeName)
    }
  },
};
</script>

<style scoped lang="css">
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
>>> .el-card__header {
  border-bottom: none;
}
.chart {
  height: 300px;
}
.tab{
  width: 100%;
}
.right{
  position: absolute;
  right: 0;
}
.right span{
  margin: 0 10px;
}
.date-picker{
  width: 200px;
  margin: 0 20px;
}
</style>
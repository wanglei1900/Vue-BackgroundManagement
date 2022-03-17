<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- 标签页事件 v-model="activeName" @tab-click="handleClick" -->
        <!-- 头部左侧 -->
        <el-tabs>
          <el-tab-pane label="销售额" name="first">销售额表格</el-tab-pane>
          <el-tab-pane label="访问量" name="second">访问量表格</el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="block">
          <span class="demonstration">今日 本周 本年 本月</span>
          <!-- v-model="value1" -->
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>

      <!-- 底部 -->
      <el-row :gutter="30">
        <el-col :span="20" class="chart">
          <!-- 左侧表格 -->
          <Chart></Chart>
        </el-col>
        <el-col :span="4">
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
};
</script>

<style scoped lang="css">
.clearfix {
  display: flex;
  justify-content: space-between;
}
>>> .el-card__header {
  border-bottom: none;
}
.chart{
    height: 300px;

}
</style>
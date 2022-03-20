<template>
  <div>
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <!-- 头部左侧 -->
        <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            class="date-picker"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
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
import dayjs from "dayjs";

import Chart from "@/views/dashboard/Sale/Chart";
import Ranking from "@/views/dashboard/Sale/Ranking";

export default {
  name: "Sale",
  components: { Chart, Ranking },
  data() {
    return {
      activeName: "sale",
      // 日历数据容器
      date: [],
    };
  },
  methods: {
    // tab标签点击事件
    handleClick() {
      // 通知子组件chart修改数据
      this.$bus.$emit("clickEvent", this.activeName);
    },
    // 设置今日日期
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    // 设置本周日期
    setWeek() {
      const monday = dayjs().day(1).format("YYYY-MM-DD");
      const sunday = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [monday, sunday];
    },
    // 设置本月日期
    setMonth() {
      const monthStart = dayjs().startOf("month").format("YYYY-MM-DD");
      const monthEnd = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [monthStart, monthEnd];
    },
    // 设置本年日期
    setYear() {
      const yearStart = dayjs().startOf("year").format("YYYY-MM-DD");
      const yearEnd = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [yearStart, yearEnd];
    },
  },

  // beforeDestroy钩子里销毁点击事件
  beforeDestroy() {
    this.$bus.$off("clickEvent");
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
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.right span {
  margin: 0 10px;
}
.date-picker {
  width: 250px;
  margin: 0 20px;
}
</style>
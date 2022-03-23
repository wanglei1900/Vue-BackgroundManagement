<template>
  <div>
    <Card />
    <Sale />
    <Observe />
  </div>
</template>

<script>
import Card from "@/views/dashboard/Card";
import Sale from "@/views/dashboard/Sale";
import Observe from "@/views/dashboard/Observe";

export default {
  name: "Dashboard",
  components: { Card, Sale, Observe },
  mounted() {
    // 首页组件一挂载就发请求货物sale模块的柱状图数据
    this.$store.dispatch("homeStore/getSaleChartInfo");
  },
};
</script>

<style scoped>
</style>

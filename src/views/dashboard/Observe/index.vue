<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <PipeChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search";
import PipeChart from "./PipeChart";
export default {
  name: "Observe",
  components: { Search, PipeChart },
};
</script>

<style>
</style>
<template>
  <el-card>
    <!-- 头部 -->
    <div slot="header" class="searchHeader">
      <div>线上热门搜索</div>
      <!-- 下拉菜单@command="handleCommand" 点击事件 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          <el-dropdown-item command="b">狮子头</el-dropdown-item>
          <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
          <el-dropdown-item command="d">双皮奶</el-dropdown-item>
          <el-dropdown-item command="e">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <SearchLineChart title="搜索用户数" number="12321" percentage="17.1">
        </SearchLineChart>
      </el-col>
      <el-col :span="12">
        <SearchLineChart title="人均搜索次数" number="2.7" percentage="26.2">
        </SearchLineChart>
      </el-col>
    </el-row>
    <div>
      <!-- :default-sort="{ prop: 'date', order: 'descending' }"
      
       -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index"  label="排名" width="70">
        </el-table-column>
        <!-- prop="date" -->
        <el-table-column label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column label="用户数" sortable>
        </el-table-column>
        <el-table-column label="周涨幅" sortable>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <!-- 分页器 -->
      <el-pagination
        style="margin-top: 20px; text-align: right"
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import SearchLineChart from "./SearchLineChart";
export default {
  name: "Search",
  components: { SearchLineChart },

  data() {
    return {
      // 表格数值
      tableData:{},
      // 下拉框的值
      dropDownCommand: "",
    };
  },
  methods: {
    handleCommand(command) {
      this.dropDownCommand = command;
    },
  },
};
</script>

<style scoped>
.searchHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 下拉框的样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
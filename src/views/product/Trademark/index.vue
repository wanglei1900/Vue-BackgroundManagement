<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin=10px 0"
      >添加</el-button
    >
    <!-- 
      表格 table
       data表格组件需要展示的数据---数组类型   
       border	是否带有纵向边框 

      表格列 
       table-column boolean
       label	显示的标题	string
       width	对应列的宽度	string
       align	对齐方式	String	left/center/right	left
       prop	对应列内容的字段名，也可以使用 property 属性	string

       注意1：elementUI当中的table组件，展示的数据是以一列一列进行展示数据

      -->
    <el-table style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align='center'>
      </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width" align='center'>
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width" align='center'>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align='center'>
      </el-table-column>
    </el-table>
    <!-- 
      分页器
      @size-change="handleSizeChange"     size-change	pageSize 改变时会触发	每页条数
      @current-change="handleCurrentChange"     current-change	currentPage 改变时会触发	当前页
      当前页，数据总条数，每一页展示的条数，连续页码数
      current-page	当前页数，支持 .sync 修饰符	number	—	1
      total	总条目数	number
      page-size	  每页显示条目个数，支持 .sync 修饰符	number	—	10
      page-sizes	每页显示个数选择器的选项设置	number[]	—	[10, 20, 30, 40, 50, 100]
      layout	组件布局，子组件名用逗号分隔	String	sizes, prev, pager, next, jumper, ->, total, slot	'prev, pager, next, jumper, ->, total'
      pager-count	页码按钮的数量，当总页数超过该值时会折叠	number	大于等于 5 且小于等于 21 的奇数	7
     -->

    <el-pagination
      style="margin-top:20px;text-align:center"
      :current-page="6"
      :total="99"
      :page-size="3"
      :pager-count="9"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->,  sizes, total"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      // 当前页码
      page:1,
      // 每页记录数
      limit:3
    }
  },
  // Trademark组件的挂载时请求品牌管理参数
  mounted() {
    // 挂载时就请求
    this.getTradeMark()
  },
  methods: {
    getTradeMark(){
      const {page,limit} = this
      this.$API.reqTradeMarkList(page,limit)
    }
  },
};
</script>

<style scoped>
</style>

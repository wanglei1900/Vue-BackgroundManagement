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
};
</script>

<style scoped>
</style>

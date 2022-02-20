<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin=10px 0"
      @click="showDialog"
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

    <el-table style="width: 100%" border :data="list">
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>

      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="width"
        align="center"
      >
        <!-- 思考这里为什么要用作用域插槽,如果不用插槽展示图片的url地址，无法通过props获取到图片 -->
        <template slot-scope="{ row, $index }">
          <!-- 饿了吗组件作用域插槽 row为数据的每条数据,$index为索引值 -->
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
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
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper, ->,  sizes, total"
    >
    </el-pagination>

    <!-- 
      对话框
      :visible.sync=  控制对话框显示与隐藏用的
       -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- form表单 :model属性，这个属性的作用是，把表单的数据收集到哪个对象中，将来elementUI需要表单验证，也需要这个属性 -->
      <el-form style="width: 80%" :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <!-- elementUI 的upload上传组件
           -->
           <!-- 这里收集数据不能使用v-model，因为不是表单元素
                action：设置图片上传的地址
                :on-success="handleAvatarSuccess"     图片上传成功的回调
                :before-upload="beforeAvatarUpload"   图片上传之前的回调
           
            -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" 
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      // 当前页码
      page: 1,
      // 每页记录数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 展示的数据
      list: [],
      // 对话框显示与隐藏的属性
      dialogFormVisible: false,
      // 收集品牌的信息,对象身上的属性不能瞎写，需要看文档
      tmForm:{
        tmName:"",
        logoUrl:""
      }
    }
  },
  // Trademark组件的挂载时请求品牌管理参数
  mounted() {
    // 挂载时就请求
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      // 当你向服务器发请求的时候，这个函数需要带参数，因此在data当中需初始化两个响应式字段
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        // 以下两条是点击事件不是加载时获取的事件
        // this.page = result.data.current
        // this.limit = result.data.size
        // 分别是展示数据的总条数与列表展示的数据
        this.total = result.data.total;
        this.list = result.data.records;
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    // 当分页器某一页，需要展示数据条数发生变化的时候触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDialog() {
      // 显示对话框
      this.dialogFormVisible = true;
      // 清除数数据，以防取消再次打开后还是上一次的数据
      this.tmForm = {tmName:'',logoUrl:''}
    },
    // 修改某一个品牌
    updateTradeMark() {
      this.dialogFormVisible = true;
      // 清除数数据，以防取消再次打开后还是上一次的数据
      this.tmForm = {tmName:'',logoUrl:''}
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // 参数res上传成功之后返回给前端的数据
      // 参数file上传成功之后返回给前端的数据

      // 收集品牌图片的数据，因为将来需要带给服务器
      this.tmForm.logoUrl = res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（添加品牌和修改品牌）
    async addOrUpdateTradeMark(){
      this.dialogFormVisible = false;
      // 发请求（可能是添加|修改品牌）
      let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
      if (result.code ==200) {
        // 弹出一个信息，添加品牌成功，修改品牌成功
        this.$message(this.tmForm.id?'修改品牌成功':"添加品牌成功")
        // 添加或者修改品牌成功之后，需要再次发请求获取列表
        this.getPageList()
      }

    }
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin:20px 0px"
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
          <!-- 这里点击事件传的row -->
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)"
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
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
       -->
       <!-- 业务逻辑：title如果代tmform.id则肯定为修改品牌 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form表单 :model属性，这个属性的作用是，把表单的数据收集到哪个对象中，将来elementUI需要表单验证，也需要这个属性 -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- elementUI 的upload上传组件-->
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
    // elementUi自定义校验规则
    var validateTmName = (rule, value, callback) => {
      // 自定义校验规则
      if (value.length <2|| value.length>10) {
        callback(new Error('品牌名称2-10位'))
      }else{
        callback()
      }
    };
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
      },
      // 表单验证规则
      rules:{
        // 品牌名称的验证规则
        // required:必须要校验的字段（前面的五角星有关系）。message提示的信息，trigger用户行为的设置（事件的设置）
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // 品牌名称长度2-10（官网自带的验证规则）
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          // 以下为自定义校验规则
          { validator: validateTmName, trigger: 'change' }
        ],
        // 品牌的logo验证规则
        logoUrl: [
          { required: true, message: '请选中品牌图片'}
        ],
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
    // 修改更新某一个品牌
    updateTradeMark(row) {
      // 对话弹窗显示
      this.dialogFormVisible = true;
      // 作用域插槽的row参数，为当前选中这个品牌的列信息
      // 将已有的品牌的信息赋值给tmform展示，将服务器返回的品牌的信息，直接赋值给tmForm进行展示
      // this.tmForm = row     为什么不能这么做，直接赋值不算拷贝成功，会将v-model的数据流向页面，未确认即篡改页面数据
      // 也就是说tmForm存储的即为服务器返回品牌信息，需要使用浅拷贝，这样才不会影响原数组
      this.tmForm = {...row}
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // 参数res上传成功之后返回给前端的数据
      // console.log(res);
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
    addOrUpdateTradeMark(){
      // 当全部的验证字段通过，再去书写业务逻辑
      this.$refs.ruleForm.validate(async(success)=>{
        // 如果全部字段符合条件
        if (success) {
          this.dialogFormVisible = false;
          // 发请求（可能是添加|修改品牌）
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code ==200) {
            // 弹出一个信息，添加品牌成功，修改品牌成功
            // this.$message(this.tmForm.id?'修改品牌成功':"添加品牌成功")
            this.$message({
              message:this.tmForm.id?'修改品牌成功':'添加品牌成功',
              type: 'success'
            });
            // 添加或者修改品牌成功之后，需要再次发请求获取列表
            // 添加品牌停留在第一页，修改品牌应该留在当前页面
            this.getPageList(this.tmForm.id?this.page:1)
          }
        }else{
          console.log('提交错误')
          return false
        }
      })
    },
    // 删除按钮（删除当前品牌信息）
    deleteTradeMark(row){
      // 弹窗
      this.$confirm(`此操作将删除${row.tmName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 当用户点击确定按钮会触发
        // 点击确认按钮向服务器发送删除请求，并携带ID参数
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          // 如果删除成功
          if (result.code ==200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 删除后需更新，再次获取品牌里列表数据
            // 删除后更新列表跳转 需判断当前展示数据长度是否需要跳转前一页
            this.getPageList(this.list.length>1?this.page:this.page-1)
          }else{
          }
      }).catch(() => {
        // 当用户点击取消按钮会触发
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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

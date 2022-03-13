<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
          <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="saveAttr">添加属性</el-button>
          <!-- 表格展示平台数据 -->
          <el-table style="width: 100%" border :data='attrList'>
              <el-table-column type="index" label="序号" width="80" align="center">
              </el-table-column>
              <el-table-column prop="attrName" label="属性名称" width="150">
              </el-table-column>
              <el-table-column prop="prop" label="属性值列表" width="width">
                <template slot-scope="{row,$index}">
                  <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id" style="margin:0px 20px">{{attrValue.valueName}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="prop" label="操作" width="150">
                <template slot-scope="{row,$index}">
                  <el-button type="warning" icon="el-icon-edit" size="mini" @click="editAttr(row)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteAttr(row)"></el-button>
                </template>
              </el-table-column>
          </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
          <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
              <el-form-item label="属性名">
                <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
              </el-form-item>
          </el-form>
          <el-button type="primary" icon="el-icon-plus" @click="saveAttrInfo"  :disabled="!attrInfo.attrName">添加属性值</el-button>
          <el-button @click="isShowTable=true">取消</el-button>

          <el-table border style="width: 100%; marigin:20px 0" :data="attrInfo.attrValueList">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>

            <el-table-column prop="" label="属性值名称" width="width">
              <template slot-scope="{row,$index}">
                <!-- 这里的结构 需要input与span来回切换,看懂这里flag写在哪里需要思考 -->
                <el-input v-if="row.flag"  :ref="$index" @blur="changeMode(row)" @keyup.native.enter="changeMode(row)" v-model="row.valueName" placeholder="请输入属性值名称" size="mini"></el-input>
                <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <!-- 气泡确认框 -->
                    <el-popconfirm :title="`你确认删除${row.valueName}?`"  @onConfirm="deleteAttrValue($index)">
                      <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">确认</el-button>
          <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需应用lodash 的深拷贝,注意按需引用
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收服务器返回的数据
      attrList: [],
      // 控制table表格的显示与隐藏，默认显示
      isShowTable:true,
      // 收集新增属性|修改属性    这里格式必须要按照接口文档写
      attrInfo:{
        "attrName": "",  //属性名
        "attrValueList": [  //属性值，因为属性值可以有多个，因此用数组，每一个属性值都要一个对象，需要attrId，valueName
        ],
        "categoryId": 0,  //三级分类的id
        "categoryLevel": 3, //因为服务器也需要区分几级id
      }
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({ categoryId, level }) {
      // 区分三级分分类的ID，以及父组件进行存储
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        // 三级分类的ID有了
        this.category3Id = categoryId;
        // 发请求获取平台的属性数据
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      // 向服务器发请求获取数据
      let result = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值表格的回调
    saveAttrInfo(){
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        // attrId相应的属性的ID，且目前我们是添加属性的操作，还没有相应的属性的id，目前而言带给服务器的id为undefined
        attrId:this.attrInfo.categoryId,  //对于修改某一个属性的时候，可以在已有的属性值基础之上新增属性值的时候（新增属性值的时候，需要把已有的属性的id带上）
        // valueName相应的属性值的名称
        valueName:'',
        // 请输入属性值名称的input与span切换标志,为什么不放在data响应式数据里（思考）
        // 给每一个属性添加一个标记flag，用户切换查看模式与编辑模式，每一个flag可以控制模式切换
        // 当前的flag是响应式数据
        flag:true,
      })
        // $nextTick,当节点渲染完毕了，会执行一次。
      this.$nextTick(()=>{
        // console.log(this.$refs[index]);
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    // 添加属性按钮看的回调
    saveAttr(){
      // 切换table显示与隐藏
      this.isShowTable = false
      // 收集三级分类的ID
      // 清除数据
      this.attrInfo = {
          "attrName": "",  //属性名
          "attrValueList": [  //属性值，因为属性值可以有多个，因此用数组，每一个属性值都要一个对象，需要attrId，valueName
          ],
          "categoryId": this.category3Id,  //三级分类的id
          "categoryLevel": 3, //因为服务器也需要区分几级id
      }
    },
    // 修改某一个属性按钮
    editAttr(row){
      // console.log(row);
      // 修改属性页面  改为展示
      this.isShowTable = false
      // 因为数据结构当中存在对象里面的嵌套结构，即对象不只有一个层级，不能使用浅拷贝，必须使用深拷贝（当然直接赋值引用更加不行）
      // 深拷贝第一种方法，json字符串对象的互相转化
      // this.attrInfo = JSON.parse(JSON.stringify(row))

      // 深拷贝的第二种方法，lodash的cloneDeep方法
      this.attrInfo = cloneDeep(row)
    },
    // 编辑和展示模式的切换，input框失焦和键入enter绑定这个方法
    changeMode(row){
      // 这里的row是新添加的数据attrValueList
      // console.log(row);
      // 检查输入属性值名称是否违法(输入是否为空)
      if (row.valueName.trim() == "") {
        this.$message({
          type:'error',
          message:'请输入合法的属性值名称',
        })
        return
      }
      // 新增的属性值不能与已有的属性值重复
      const {attrValueList} = this.attrInfo
      if ( attrValueList.some((element,index)=>{
        // 判断的时候需要把新增的最后（push）那一项删除
        if(index < attrValueList.length-1){
          // 那输入框新增的属性值名称和已有的表格里的属性值名称判断
          return element.valueName == row.valueName
        }
      })){
        this.$message({
          type:'error',
          message:'请不要输入重复的属性值名称',
        })
        return
      }
      row.flag =false
    },
    // 点击span的回调变为编辑模式
    toEdit(row,index){
      row.flag=true
      // 获取input节点，实现自动聚焦
      // 需要注意：点击span的时候，切换为input变为编辑模式。但是需要注意，对于浏览器而言，页面重绘与重排耗时间的
      // 点击span 的时候，重绘重排一个input他是需要耗费时间的，因此我们不可能一点击span立马获取到input
      // $nextTick,当节点渲染完毕了，会执行一次。
      this.$nextTick(()=>{
        // console.log(this.$refs[index]);
        this.$refs[index].focus()
      })
    },
    // 气泡确认框按钮的回调   新版的elementUi --2.15.7        我们使用的版本是2.13.2
    deleteAttrValue(index){
      // 当前操纵不需要发请求
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 保存按钮，进行添加属性或者修改属性的操作
    async addOrUpdateAttr(){
      // 整理参数：如果用户添加了很多属性值，且属性值为空，则不应该提交给服务器
      this.attrInfo.attrValueList =this.attrInfo.attrValueList.filter(element=>{
        if (element.valueName !== "") {
          // 删除flag属性
          return delete element.flag
        }
      })

      // 发请求 把整理完的数据给服务器
      try {
        // 发送请求
        await this.$API.attr.reqSaveOrUpdateAttrInfo(this.attrInfo)
        // 弹窗通知用户修改成功
        this.$message({
          type:'success',
          message:'恭喜你保存成功'
        })
        // 保存成功以后要获取最新的列表
        this.getAttrList()
        // 切换table页面展示
        this.isShowTable = true
      } catch (error) {
        this.$message({type:'warning', message:'保存失败'})
      }
    },
    // 删除整条属性 按钮的回调
    deleteAttr(row){
      // API文档拿取当前点击的attrId,观察开发者工具发现就是id属性，结构id属性
      const {id} = row

      this.$confirm(`是否确认删除属性【${row.attrName}】？`, '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 发起请求，根据对应id删除整条属性
        await this.$API.attr.reqDeleteAttr(id)
        // 删除完后，重新更新数据
        this.getAttrList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({type:"warning", message:'取消删除数据'})      
      });
    }
  },
};
</script>

<style scoped>
</style>

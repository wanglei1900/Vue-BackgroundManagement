<template>
  <div>
    <el-form ref="form" :model="spuInfo" label-width="80px" >
      <el-form-item label="SPU名称" >
        <el-input v-model="spuInfo.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in trademarkList" :key="tm.id" ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <!-- type="textarea" 文本输入框 rows="40px" 文本框的初始高度  -->
        <el-input type="textarea" rows="8px" placeholder="请输入spu描述" v-model="spuInfo.description"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <!-- elementUI 的upload上传组件 照片墙-->
          <!-- 这里收集数据不能使用v-model，因为不是表单元素
          list-type	文件列表的类型	string	text/picture/picture-card	text
                action：设置图片上传的地址
                :on-preview="handlePictureCardPreview"    图片预览的时候会触发
                :on-remove="handleRemove"             删除图片的时候会触发
                file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array	—	[]
                照片墙需要展示的数据【数组：数组里面的元素务必要有name、url属性】
                :on-success="handleAvatarSuccess"     图片上传成功的回调
                :before-upload="beforeAvatarUpload"   图片上传之前的回调
                on-preview 图片预览的回调
                on-remove  图片删除的回调
          -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="spuImageList.imgUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="pendingAttrIdAndName" :placeholder="`还有${pendingSaleAttrList.length}项未选择`">
          <el-option v-for="(item,index) in pendingSaleAttrList" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!pendingAttrIdAndName" @click="updateSaleAttr">添加销售属性</el-button>
        <!-- 展示的是当前spu属于自己的销售属性 -->
        <el-table :data="spuInfo.spuSaleAttrList" style="width: 100%" border>
          <el-table-column align="center" type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="100px">
          </el-table-column>
          <el-table-column prop="spuSaleAttrList" label="属性值名称列表">
            <template slot-scope="{row,$index}">
              <!-- 饿了么组件动态编辑标签
              el-tag：用户展示已有属性值列表的数据的
                -->
              <el-tag :key="tag.id" v-for="(tag) in row.spuSaleAttrValueList" closable @close="handleClose(tag,row)" :disable-transitions="false">
                {{tag.saleAttrValueName}}
              </el-tag>
              <!-- input 和 button互相切换
              个人认为以下两个确认input框的回调 使用其中一个就行了
               @blur="handleInputConfirm"     @keyup.enter.native="handleInputConfirm(row)"
               -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)">
              </el-input>
              <!--  @click="showInput"  -->
              <el-button v-else class="button-new-tag" size="small" @click="updateSaleAttrValue(row)">+ 添加</el-button>

            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="row,$index">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSaleAttr(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateOrSaveSpuInfo">保存</el-button>
        <el-button type="normal" @click="cancelSpuForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      // spuInfo spu信息，spu初始化的时候是一个空对象，在修改spu 的时候，会向服务器发请求，返回spu信息，在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
      // 添加spu，如果是添加spu 的时候并没有向服务器添加请求，数据收集到哪里【spu】，收集数据的时候有哪些字段，看文档
      spuInfo: {
        // 三级分类的id
        category3Id: 0,
        // 平台的id
        tmId: '',
        // 描述
        description: "", 
        // spu的名称
        spuName:'',
        // 收集spu图片的信息
        spuImageList: [
          /* {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          }, */
        ],
        // 平台属性的属性值
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "",
          //       saleAttrName: "",
          //       saleAttrValueName: "",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      // trademarkList 品牌列表信息
      trademarkList: [],
      // spuImageList spu图片列表信息
      spuImageList: [],
      // baseSaleAttrList,寄出spu属性
      baseSaleAttrList: [],
      // 此处为下拉框手机的未选择的销售属性的ID，需要发请求带给参数，并且以此id作为右边按钮disable的布尔值
      pendingAttrIdAndName:""
    };
  },
  methods: {
    // 照片墙图片上传的两个回调
    // 图片删除的回调，需要收集数据
    handleRemove(file, fileList) {
      // file参数：代表的是删除的那个图片
      // fileList参数：照片墙删除某一张图片以后，剩余其他的图片
      // console.log(file, fileList);
      // 收集照片墙图片的数据
      // 对于已有的图片【照片墙中显示的图片：照片墙组件需要有name、url属性】，因为照片墙显示数据务必要有这两个属性
      // 对于服务器不需要name和url字段，将来对已有的图片的数据提交给服务器的时候，需要处理
      this.spuImageList = fileList
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 放大对话框的显示
      this.dialogVisible = true;
    },
    // 照片墙图片上传成功的回调
    handleAvatarSuccess (response, file, fileList){
      // 收集图片的信息
      this.spuImageList = fileList
    },

    // 初始化spuForm
    async initSpuForm(row) {
      // console.log(row);
      // 点击修改时，通过id查询点击的某一个spu的信息
      let result = await this.$API.spu.reqGetSpuById(row.id);
      if (result.code == 200) {
        this.spuInfo = result.data;
      }
      // 点击修改时，获取品牌列表下拉菜
      let result1 = await this.$API.spu.reqGetTrademarkList();
      if (result1.code == 200) {
        this.trademarkList = result1.data;
      }
      // 点击修改时，获取spu图片的列表
      let result2 = await this.$API.spu.reqSpuImageList(row.id);
      if (result2.code == 200) {
        // 由于照片墙显示图片的数据是数组，数组里面的元素要有name和url字段
        // 所以需要把数据调整一下
        let listArr = result2.data
        listArr.forEach(element => {
          element.name = element.imgName
          element.url = element.imgUrl
        });
        this.spuImageList = listArr;
      }
      // 点击修改时，获取平台中所有的销售属性（最多3个，颜色、版本、尺码）
      let result3 = await this.$API.spu.reqBaseSaleAttrList();
      if (result3.code == 200) {
        this.baseSaleAttrList = result3.data;
      }
    },
    // 添加新的销售属性
    updateSaleAttr (){
      // 已经收集需要添加的销售属性的信息
      // 把收集到的销售属性数据进行分割
      const [baseSaleAttrId, saleAttrName] =  this.pendingAttrIdAndName.split(':')
      // 向spu对象的spuSaleAttrValueList属性里面添加销售属性
      let newSaleAttr = {baseSaleAttrId, saleAttrName,spuSaleAttrValueList:[]}
      // 添加新的销售属性
      this.spuInfo.spuSaleAttrList.push(newSaleAttr)
      // 清除已经添加的属性
      this.pendingAttrIdAndName = ''
    },
    // 为某一个属性对应的销售属性值的回调
    updateSaleAttrValue (row){
      console.log(row);
      // 点击销售值属性当中的添加妞妞，需要有button变为input，通过当前销售属性inputVisible控制显示
      // 挂载在销售属性身上的响应式数据inputValue，控制button与input切换
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    // 添加属性值的elinput输入框失去焦点后的回调
    handleInputConfirm (row){
      // 解构出销售属性当 手机数据
      const {baseSaleAttrId,inputValue} = row
      // 首先。新增的销售值不能为空
      if (inputValue.trim() =='') {
        this.$message({type:'error',message:'输入不能为空'})
        // 其次。新增销售属性值不能重复
      }else if(row.spuSaleAttrValueList.some(element=> element.saleAttrValueName ==inputValue)){
        this.$message({type:'error',message:'输入重复'})
      }else{
        // 验证完毕。新增的销售属性值
        let newSaleAttrValue ={baseSaleAttrId,saleAttrValueName:inputValue}
        row.spuSaleAttrValueList.push(newSaleAttrValue)
        // 修改inputVisible为false，显示button
        row.inputVisible = false
      }
    },
    // 删除某一个点击的tag
    handleClose(tag,row) {
      // console.log(tag,row);
      // tag为当前点击属性值列表的某一个属性值，
      // 在当前属性的属性值列表中  通过indexof查询到 tag所在数组的索引  然后后splice切割数组
      row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(tag), 1);
    },
    // 删除某一行整个 的 属性
    deleteSaleAttr (row){
      // console.log(row);
      this.spuInfo.spuSaleAttrList.splice(row.$index,1)
    },
    // 点击spu按钮的时候，发请求的函数
    async saveSpuData (category3Id){
      // 点击添加按钮的时候，收集三级分类的id
      this.spuInfo.category3Id = category3Id
      // 点击添加时，获取品牌列表下拉菜
      let result1 = await this.$API.spu.reqGetTrademarkList();
      if (result1.code == 200) {
        this.trademarkList = result1.data;
      }
      // 点击添加时，获取平台中所有的销售属性（最多3个，颜色、版本、尺码）
      let result3 = await this.$API.spu.reqBaseSaleAttrList();
      if (result3.code == 200) {
        this.baseSaleAttrList = result3.data;
      }
    },
    // 确认按钮修改或者添加某一个
    async updateOrSaveSpuInfo (){
      // 整理参数spuInfo.spuImageList 数组里的每一个项必须有imgName,imgUrl
      this.spuInfo.spuImageList = this.spuImageList.map((element)=>{
        return {imgName:element.name,
                imgUrl:element.id&&element.url || element.response.data}
      })
      // 发请求
      let result = await this.$API.spu.reqUpdateOrSaveSpuInfo(this.spuInfo)
      if (result.code ==200) {
        // 通知父组件spu更换场景，并且需要在场景0 的时候更新spu数据
        this.$message({type:'success', message:'保存成功'})
        this.$emit('changeScene', {scene:0, flag:this.spuInfo.id?'修改':'添加'})
      }
      // 清除数据
      Object.assign(this._data, this.$options.data.call(this))
    },

    // 取消按钮
    cancelSpuForm (){
      // 点击取消按钮的时候，通知父组件切换场景为0
      this.$emit('changeScene', {scene:0, flag:''})
      // 需要清除数据,注意这种写法
      // Object.assign()  ES6中新增的方法可以合并对象
      // 组件实例的this._data，可以操作data当中响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data.call(this))
    }

  },
  computed: {
    // 计算出下拉菜单框的未被选择的属性（只有三个,尺寸、颜色、版本）baseSaleAttrList
    // 当前spu拥有的属于直接的销售属性spuSaleAttrList   
    pendingSaleAttrList (){
     return this.baseSaleAttrList.filter((item)=>{
      //  every数组会返回一个布尔值（真的假的）
        return this.spuInfo.spuSaleAttrList.every((element)=>{
          return  item.name !== element.saleAttrName
        })
      })
    }
  },
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <span>{{spu.spuName}}</span>
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input type="number" placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input type="number" placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndAttrValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndSaleAttrValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
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
                复选框的回调函数
          -->
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column header-align="center" align="center" prop="prop" type="selection" width="80px">
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="spuImageList" label="图片">
              <template slot-scope="{row,$index}">
                <img :src="row.imgUrl" style="width:100px;height:100px">
              </template>
          </el-table-column>
          <el-table-column eader-align="center" align="center" prop="prop" label="名称">
              <template slot-scope="{row,$index}">
                {{row.imgName}}
              </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="prop" label="操作">
             <template slot-scope="{row,$index}">
                <el-button type="normal" v-if="row.isDefault==0" @click="changeDefault(row)">设为默认</el-button>
                <el-button type="primary" v-else>默认</el-button>
             </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">确认</el-button>
        <el-button type="normal" @click="cancelSkuForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 销售属性列表
      spuImageList: [],
      // 销售属性列表
      spuSaleAttrList: [],
      //   attrInfoList
      attrInfoList: [],
      // 收集sku数据的字段
      skuInfo: {
        // 第一类数据，父组件给的数据
        category3Id: '',
        spuId:'',
        tmId:'',
        // 第二类，需要通过数据双向绑定v-model
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        // 第三类，需要自己书写代码
        // 图片默认值
        skuDefaultImg: "",
        // 收集图片的字段
        skuImageList: [
          /* {
            id: 0,
            imgName: "",
            imgUrl: "",
            isDefault: "",
            skuId: 0,
            spuImgId: 0,
          }, */
        ],
        // 平台属性
        skuAttrValueList: [
          /* {
            // 平台熟悉的id
            attrId: '',
            // 平台属性值的id
            valueId: '',
          }, */
        ],
        // 收集销售数字列表
        skuSaleAttrValueList: [
          /* {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "string",
            saleAttrValueId: 0,
            saleAttrValueName: "string",
            skuId: 0,
            spuId: 0,
          }, */
        ],
      },
      imageList:[],
      spu:{
        spuName:''
      }
    };
  },
  methods: {
    //  接收父组件的通知，发情三个请求，获取skuform数据
    async saveSpuData(category1Id, category2Id, category3Id, spu) {
      // 收集父组件给与的数据
      this.skuInfo.category3Id = category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu.spuName = spu.spuName
      // 这里可以试下Promise.all
      // 获取spu图片列表信息
      let result = await this.$API.sku.reqSpuImageList(spu.id);
      if (result.code == 200) {
        let list = result.data
        list.forEach(element => element.isDefault=0);
        this.spuImageList = list;
      }
      // 获取销售属性列表
      let result1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      // 获取attrInfoList
      let result2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // 点击取消按钮，通知父组件切换为0 的场景
    cancelSkuForm (){
      this.$emit('change-scene', {scene:0, flag:''})
      Object.assign(this._data, this.$options.data.call(this))
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (val){
      this.imageList = val
    },
    // 切换默认按钮
    changeDefault(row){
      console.log(row);
      this.spuImageList.forEach(element => element.isDefault=0)
      row.isDefault = 1
    }
  },
};
</script>

<style scoped>
</style>
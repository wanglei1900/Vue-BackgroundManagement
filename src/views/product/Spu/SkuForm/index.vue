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
        <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndSaleAttrValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table style="width: 100%" border>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            type="selection"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="图片"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
            <el-button type="primary">设为默认</el-button>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">确认</el-button>
        <el-button @click="cancelSkuForm">取消</el-button>
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
      spu:{
        spuName:''
      }
    };
  },
  methods: {
    //  接收父组件的通知，发情三个请求，获取skuform数据
    async saveSpuData(category1Id, category2Id, category3Id, spu) {
      console.log(spu);
      // 收集父组件给与的数据
      this.skuInfo.category3Id = category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu.spuName = spu.spuName
      // 这里可以试下Promise.all
      // 获取spu图片列表信息
      let result = await this.$API.sku.reqSpuImageList(spu.id);
      if (result.code == 200) {
        this.spuImageList = result.data;
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
      this.$emit('changeScene', {scene:0, flag:''})
    }
  },
};
</script>

<style scoped>
</style>
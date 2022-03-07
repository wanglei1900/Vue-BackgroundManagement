<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <span>SPU名称</span>
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
          <el-input type="textarea" rows="8px" placeholder="规格描述"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
          <el-form :inline="true" ref="form" label-width="80px">
            <el-form-item label="屏幕尺寸">
                <el-select value="" placeholder="请选择">
                    <el-option label="label" value="value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="无线通信">
                <el-select value="" placeholder="请选择">
                    <el-option label="label" value="value"></el-option>
                </el-select>
            </el-form-item>
          </el-form>

      </el-form-item>

      <el-form-item label="销售属性">
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item label="颜色">
                <el-select v-model="model" placeholder="请选择">
                    <el-option label="label" value="value"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
          <el-table style="width: 100%" border>
            <el-table-column header-align="center" align="center" prop="prop" type="selection" width="80px">
                
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="prop" label="图片" >
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="prop" label="名称" >
            </el-table-column>
            <el-table-column header-align="center" align="center" prop="prop" label="操作" >
                <el-button type="primary">设为默认</el-button>
            </el-table-column>
          </el-table>
      </el-form-item>

      <el-form-item>
          <el-button type="primary">确认</el-button>
          <el-button >取消</el-button>
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
        spuImageList:[],
        // 销售属性列表
        spuSaleAttrList:[],
        //   attrInfoList
        attrInfoList:[]
      }
  },
  methods: {
    //  接收父组件的通知，发情三个请求，获取skuform数据
    async saveSpuData (category1Id, category2Id, category3Id, spuId){
        // 这里可以试下Promise.all
        // 获取spu图片列表信息
        let result = await this.$API.sku.reqSpuImageList(spuId)
        if (result.code ==200) {
            this.spuImageList = result.data
        }
        // 获取销售属性列表
        let result1 = await this.$API.sku.reqSpuSaleAttrList(spuId)
        if (result1.code ==200) {
            this.spuSaleAttrList = result1.data
        }
        // 获取attrInfoList
        let result2 = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, category3Id)
        if (result2.code ==200) {
            this.attrInfoList = result2.data
        }
    }
  },
};
</script>

<style scoped>
</style>
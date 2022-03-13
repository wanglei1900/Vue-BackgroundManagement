<template>
  <div>
    <el-table border :data="skuList" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>

      <el-table-column prop="skuName" label="名称" width="width"> </el-table-column>

      <el-table-column prop="skuDesc" label="描述" width="width"> </el-table-column>

      <el-table-column prop="prop" label="默认图片" width="150" align="center">\
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="width:140px; height:140px;">
        </template>
      </el-table-column>

      <el-table-column prop="weight" label="重量(kg)" width="100"></el-table-column>

      <el-table-column prop="price" label="价格" width="120"> </el-table-column>

      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{row,$index}">
          <div style="display:inline"  @click="changeOnSale(row)">
            <hint-button v-show="row.isSale==1" type="success" icon="el-icon-sort-up" size="mini" title="上架"></hint-button>
            <hint-button v-show="row.isSale==0" type="info" icon="el-icon-sort-down" size="mini" title="下架"></hint-button>
          </div>
          <hint-button @click="$message({type:'info', message:'正在开发中'})" type="primary" icon="el-icon-edit" size="mini" title="修改"></hint-button>
          <hint-button @click="getSkuInfoById(row)" type="info" icon="el-icon-info" size="mini" title="查看"></hint-button>
          <hint-button @click="deleteSku(row)" type="danger" icon="el-icon-delete" size="mini" title="删除" style="margin:0 20px"></hint-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
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
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      style="margin-top:20px; text-align:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-count="7"
      :page-size="limit"
      layout="prev, pager, next, jumper, -> ,sizes, total"
      :total="total">
    </el-pagination>

    <!-- 抽屉
     :before-close="handleClose" -->
    <el-drawer title="SKU平台属性" :visible.sync="drawer" :direction="direction">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfoById.skuName}}</el-col>  
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfoById.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfoById.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <!-- tag标签动态展示 -->
          <el-tag style="margin:0 3px;" type="success" v-for="(attr,index) in skuInfoById.skuAttrValueList" :key="attr.id">{{attr.attrId}}-{{attr.valueId}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <!-- 轮播图 -->
              <el-carousel trigger="click" height="300px" >
                <el-carousel-item v-for="item in skuInfoById.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" style="height:100%; width:100%">
                </el-carousel-item>
              </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>


</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 分页器所需响应式数据,当前页数，每页展示个数，总页数。其中当前页和每页展示个数为点击事件获取
      page:1,
      limit:3,
      total:0,
      // 用于展示skuList
      skuList: [],
      // 用于展示某个sku
      skuInfoById:{},
      // 控制抽屉
      drawer: false,
      direction: 'rtl',
    };
  },
  methods: {
    // 发起请求获取skuList数据（注意pager是 合并点击事件@current-change="handleCurrentChange" 为getSkuList）
    async getSkuList (pager= 1){
      this.page = pager
      const {page, limit} = this
      // 发起请求捞取sku列表数据
      let result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code ==200) {
        const {current, sizes, total, records} = result.data
        // 以下两条是点击事件不是加载时获取的事件
        //  this.page = current
        //  this.limit = sizes
         this.total = total
         this.skuList = records
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    // 改变时会触发	每页条数
    handleSizeChange (limit){
      this.limit = limit
      this.getSkuList()
    },
    // currentPage 改变时会触发	当前页   这个回调已经和getSkuList合并了
    /* handleCurrentChange (pager){
      this.page = pager
      this.getSkuList()
    },  */
    // 切换sku的上架/下架状态
    async changeOnSale (row){
      const {id,isSale} = row
      if (isSale ==1) {
        let result1 = await this.$API.sku.reqCancelSale(id)
        if (result1.code ==200) {
          this.$message({type:'success', message:'产品下架成功'})
          // 下架成功，重新获取SKU列表
          this.getSkuList()
        }else{
          return Promise.reject(new Error('faile'))
        }
      }else{
        let result2 =  await this.$API.sku.reqOnSale(id)
        if (result2.code ==200) {
          this.$message({type:'success', message:'产品上架成功'})
          // 上架成功，重新获取SKU列表
          this.getSkuList()
        }else{
          return Promise.reject(new Error('faile'))
        }
      }
    },
    // 删除sku信息
    async deleteSku (row){
      try {
        await this.$API.sku.reqDeleteSku(row.id)
        this.$message({type:'success', message:'已经成功删除sku信息'})
        this.getSkuList()
      } catch (error) {
        
        this.$message({type:'warning', message:'删除失败'})
      }
    },
    // 查看某个spu的信息 
    async getSkuInfoById (row){
      // 打开抽屉
      this.drawer = true
      try {
        let result = await this.$API.sku.reqGetSkuBySpuId(row.id)
        console.log(result);
        this.skuInfoById = result.data
      } catch (error) {
        this.$message({type:'warning', message:'查看信息失败'})
      }
    }
  },
   mounted() {
     // SKU页面挂载时即发送请求
     this.getSkuList()
  },
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

</style>

<style scoped>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin: 10px 10px;
  }
  >>>.el-carousel__button {
    width: 10px;
    height: 10px;
    background: #475669;
    border-radius: 50%;
  }
</style>

<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- 直接引用三级联动组件CategorySelect -->
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!==0" />
    </el-card>
    <!-- 展示spu列表  共三个模块 -->
    <el-card>
      <!-- 底部有三部分切换 -->
      <div v-show="scene==0">
        <!-- 展示spu列表的 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加Spu</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="150px">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="250px">
            <template slot-scope="{row,$index}">
              <!-- 用封装的hintButton 替换 -->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加spu" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表"></hint-button>
              <!-- <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" @click="deleteSpu(row)"></hint-button> -->
              <!-- 删除按钮改为气泡确认框 -->
              <template>
                <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="确认删除吗？"  @onConfirm="deleteSpu(row)">
                  <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference">删除</hint-button>
                </el-popconfirm>
              </template>

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
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          :total="total"
          layout="prev, pager, next, jumper, -> , sizes , total"
        >
        </el-pagination>

      </div>
      <SpuForm v-show="scene==1" @changeScene='changeScene' ref="spu" />
      <SkuForm v-show="scene==2" ref="sku" />
    </el-card>
  </div>
</template>

<script>
import SpuForm from '@/views/product/Spu/SpuForm'
import SkuForm from '@/views/product/Spu/SkuForm'
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 分页器当前页的页码
      page:1,
      // 每一页展示多少条数据
      limit:3,
      // 一共有多少条数据
      total:0,
      // 存储spu数据的列表
      records:[],
      // 控制spu的三个列表进行切换
      scene:0
    };
  },
  components:{SpuForm,SkuForm},
  methods: {
    // 自定义事件的回调(三级联动的自定义事件)
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
        // 发请求获取的属性数据
        this.getSpuList();
      }
    },
    // 获取Spu属性列表的数据
    async getSpuList(pager =1) {
      this.page = pager
      const {page,limit,category3Id} = this
        let result = await this.$API.spu.reqGetSpuList(page, limit, category3Id)
        console.log(result);
        if (result.code ==200) {
          // 接收服务器返回的当前页
          this.page = result.data.current
          // 接收服务器返回的共多少条数据
          this.total = result.data.total
          // 接收服务器返回的spu数据列表
          this.records = result.data.records
        }
    },
    // 分页器一页固定展示多少条数（按钮如 3/page   5/page）
    handleSizeChange(limit){
      // 修改当前页估计展示数
      this.limit = limit
      // 需重新更新列表
      this.getSpuList()
    },
    // 添加Spu
    addSpu (){
      this.scene = 1
      // 通知子组件spuForm发请求---两个    点击添加按钮时并携带参数三级id
      this.$refs.spu.saveSpuData(this.category3Id)
    },
    // 修改Spu
    updateSpu (row){
      // row 为当前的spu数据
      this.scene = 1
      // 点击修改spu按钮时，获取子组件初始化spuform
      this.$refs.spu.initSpuForm(row)
    },
    // 自定义事件，接收子组件通知，切换场景
    changeScene ({scene,flag}){
      // 切换场景为0，展示Spu界面
        this.scene = scene
      // flag是为了区分保存按钮时是添加还是修改
      if (flag == "修改") {
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
    },
    // 删除spu按钮的   
    async deleteSpu (row){
      // console.log(row);
      // 发请求删除
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code ==200) {
        // 将点击row那一行删除掉
        this.records.splice(this.records.indexOf(row),1)
        // 更新列表,注意判断删掉时展示的逻辑(三目表达式)
        this.records.length>1?this.getSpuList(this.page):this.getSpuList(this.page-1)
        this.$message({type:'success', message:'删除成功'})
      }else{
        this.$message({type:'error', message:'删除失败'})
      }
    },
    // 添加sku方法的回调
    addSku (row){
      // 切换场景
      this.scene = 2
      console.log(row);
      // 父组件调用子组件的方法，让子组件发三个请求
      this.$refs.sku.saveSpuData(this.category1Id,this.category2Id,this.category3Id, row.id)
    }
  },
};
</script>

<style scoped>
</style>

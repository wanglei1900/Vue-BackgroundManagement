<template>
  <div>
      <!-- inline:代表的是行内表单，代表一行可以设置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
        <el-form-item label="一级分类">
            <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1()" :disabled="show">
                <!-- 这里value要收集一级分类的id，为 ↑ 二级分类作准备 -->
                <el-option :label="c1.name" :value="c1.id" v-for="(c1,index) in list1" :key="c1.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="一级分类">
            <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2()" :disabled="show">
                <el-option :label="c2.name" :value="c2.id" v-for="(c2,index) in list2" :key="c2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="一级分类">
            <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3()" :disabled="show">
                <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
      return {
        //  一级分类的数据
        list1:[],
        //  二级分类的数据
        list2:[],
        // 三级分类的数据
        list3:[],
        //   收集相应的一级二级三级分类的ID
        cForm:{
            category1Id:'',
            category2Id:'',
            category3Id:'',
        }
      }
  },
  // 在组件挂载完毕，向服务器发送请求，获取相应的一级分类的数据
  mounted() {
    // 获取一级分类的数据方法
    this.getCategory1List()
  },
  methods: {
    //   获取一级分类的数据方法
    async getCategory1List(){
          let result = await this.$API.attr.reqCategory1List()
          if (result.code ==200) {
              this.list1 = result.data
          }
    },
    //   一级分类的select事件回调（当一级分类的option发生变化的时候获取相应二级分类的数据）
    async handler1(){
        // 清除数据
        this.list2 = []
        this.list3 = []
        this.cForm.category2Id = ''
        this.cForm.category3Id = ''

        // 解构出一级分类的ID
        const {category1Id} = this.cForm
        this.$emit('getCategoryId', {categoryId:category1Id, level:1})
        // 通过一级分类的ID获取二级分类的数据
        let result = await this.$API.attr.reqCategory2List(category1Id)
        if (result.code ==200) {
            // 存储二级分类数据为响应式数据
            this.list2 = result.data
        }
    },
    // 二级分类的select事件回调（当二级分类的option发生变化的时候获取相应二级分类的数据）
    async handler2(){
        // 清除数据
        this.list3 = []
        this.cForm.category3Id = ''
        // 解构出二级分类的ID
        const {category2Id} = this.cForm
        this.$emit('getCategoryId', {categoryId:category2Id, level:2})
        // 通过二级分类的ID获取三级分类的数据
        let result = await this.$API.attr.reqCategory3List(category2Id)
        if (result.code ==200) {
                // 存储三级分类数据为响应式数据
                this.list3 = result.data           
        }
    },
    async handler3(){
        // 获取当前的category3Id
        const {category3Id} = this.cForm
        this.$emit('getCategoryId',  {categoryId:category3Id, level:3})
    }
  },
};
</script>

<style scopd>
</style>
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="SPU名称">
            <el-input v-model="model" placeholder="SPU名称"></el-input>
        </el-form-item>

        <el-form-item label="品牌">
            <el-select v-model="model" placeholder="请选择品牌">
                <el-option label="label" value="value"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="品牌">
            <!-- type="textarea" 文本输入框 rows="40px" 文本框的初始高度  -->
            <el-input type="textarea" rows="8px" placeholder="SPU描述"></el-input>
        </el-form-item>

        <el-form-item label="SPU图片">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>

        <el-form-item label="销售属性">
            <el-select v-model="model" placeholder="还有三项未选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
            <el-table :data="data" style="width: 100%" border>
                <el-table-column align="center" type="index" label="序号" width="80px">
                </el-table-column>
                <el-table-column prop="prop" label="属性名" width="100px">
                </el-table-column>
                <el-table-column prop="prop" label="属性值名称列表" >
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="150px">
                </el-table-column>
            </el-table>
        </el-form-item>

        <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="normal">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
        dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
    //   图片上传的两个回调
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  },
};
</script>

<style>

</style>

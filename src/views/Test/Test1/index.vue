<template>
  <div>
       <el-button type="primary" v-show="$store.state.user.buttons.indexOf('cuser.update')!=-1">添加按钮1</el-button>
       <el-button type="primary"  v-show="$store.state.user.buttons.indexOf('cuser.delete')!=-1">添加按钮2</el-button>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style scoped>

</style>

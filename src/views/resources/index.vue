<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="选择日期:"><el-date-picker v-model="date_picker"></el-date-picker></el-form-item>
      <el-form-item label="对照批次号:"><el-input></el-input></el-form-item>
      <el-button type="primary">查找</el-button>
    </el-form>

    <el-table :data="tableData">
      <el-table-column label="对照批次号"></el-table-column>
      <el-table-column label="对照稽查名称"></el-table-column>
      <el-table-column label="参照结果"></el-table-column>
      <el-table-column label="对照结果"></el-table-column>
      <el-table-column label="浙江省杭州市三墩机房(pod1)"></el-table-column>
      <el-table-column label="浙江省杭州市石桥机房(pod2)"></el-table-column>
      <el-table-column label="浙江省杭州市石桥机房(pod3)"></el-table-column>
      <el-table-column label="浙江省金华市金华机房(pod4)"></el-table-column>
      <el-table-column label="浙江POD5（池外）"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return{
        date_picker:''
      }
    }
  }
</script>

<style scoped>

</style>

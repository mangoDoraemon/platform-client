<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择日期:">
        <el-date-picker v-model="datatime"  size="small" @change="getList">

        </el-date-picker>
      </el-form-item>
      <el-form-item label="对照批次号:"> <el-select v-model="a" placeholder="请选择" >
        <el-option
          v-for="item in dzBatch"
          :key="item.dzBatch"
          :label="item.label"
          :value="item.dzBatch"
          size="small">
        </el-option>
      </el-select></el-form-item>
      <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="dzBatch" label="对照批次号"></el-table-column>
      <el-table-column prop="dzName" label="对照稽查名称"></el-table-column>
      <el-table-column prop="czResult" label="参照结果"></el-table-column>
      <el-table-column prop="dzResult" label="对照结果"></el-table-column>
      <el-table-column prop="pod1" label="浙江省杭州市三墩机房(pod1)"></el-table-column>
      <el-table-column prop="pod2" label="浙江省杭州市石桥机房(pod2)"></el-table-column>
      <el-table-column prop="pod3" label="浙江省杭州市学院路机房(pod3)"></el-table-column>
      <el-table-column prop="pod4" label="浙江省金华市金华机房(pod4)"></el-table-column>
      <el-table-column prop="pod5" label="浙江POD5（池外）"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getList} from "@/api/alarm/resources"
  export default {
    name: 'index',
    data(){
      return{
        date_picker:'',
        tableData:[],
        dateParam:"",
        datatime:"",
        a:'',
        dzBatch:''
      }
    },
    created(){
      this.getList();
    },
    methods:{
      onSubmit(){

      },
      getList(){
        getList(this.dateParam).then((response) => {
          this.tableData = response.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>

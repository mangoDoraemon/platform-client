<template>
  <div class="app-container">
  <el-form :inline="true" :model="formInline" class="demo-form-inline" >
    <el-form-item label="选择日期：" >
      <el-date-picker
        v-model="datatime"
        type="date"
        placeholder="选择日期" size="small">
      </el-date-picker>
    </el-form-item>

    <el-form-item>
      <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit" >查找</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    style="width: 100%"

  >
    <el-table-column
      prop="date"
      label=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="集团上报情况"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="总批次"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上报成功批次"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上报失败批次"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="未上报批次"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上报失败/未上报原因"
      align="center">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import {getList} from "@/api/alarm/batch"
    export default {
      name: "today",
      data(){
          return{
            loading:false,
            datatime:'',
            formInline: {
              user: '',
              region: ''
            },
            tableData:[],
            queryParams: {
              pageNum: 1,
              pageSize: 10,
            },
            batchnum:[]
          }
      },
      created(){

      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
        getList1(){
          getList(this.datatime).then((response) => {
            this.batchnum = response.data;
            console.log("this.batchnum)"+this.batchnum)
            this.loading = false;
          })
        },
      }
    }
</script>

<style scoped>

</style>

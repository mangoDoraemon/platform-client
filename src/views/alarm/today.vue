<template>
  <div class="app-container">
  <el-form :inline="true" :model="formInline" class="demo-form-inline" >
    <el-form-item label="选择日期：" >
      <el-date-picker
        :clearable="clearable"
        v-model="queryParams.dateTime"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期" size="small"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
    </el-form-item>
  </el-form>
  <el-table
    v-loading="loading"
    :data="tableData"
    :default-sort="{prop:'sort', order:'descending'}"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column
      prop="modelName"
      label="模型名称"
      align="center">
    </el-table-column>
    <el-table-column
      prop="reportSituation"
      label="上报情况"
      align="center">
    </el-table-column>
    <el-table-column
      prop="totalBatch"
      label="总批次"
      align="center">
    </el-table-column>
    <el-table-column
      prop="successfulBatches"
      label="上报成功批次"
      align="center">
    </el-table-column>
    <el-table-column
      prop="failBatches"
      label="上报失败批次"
      align="center">
    </el-table-column>
   <!-- <el-table-column
      prop="notReport"
      label="上报失败/未上报原因"
      align="center">
    </el-table-column>-->
  </el-table>
  </div>
</template>

<script>
  import {getOverViewList} from "@/api/alarm/batch"
    export default {
      name: "today",
      data(){
          return{
            isExt:false,
              clearable:false,
              loading:false,
            formInline: {
              user: '',
              region: ''
            },
            tableData:[],
            queryParams: {
              pageNum: 1,
              pageSize: 10,
              dateTime:''
            },
          }
      },
      created(){
          this.getList();
      },
      methods: {
        onSubmit() {
          this.getList();
          console.log('submit!');
        },
        getList() {
          this.loading = true;
          if (this.queryParams.dateTime == '') {
            this.queryParams.dateTime = this.parseTime(new Date()).substring(0, 10)
          }
          getOverViewList(this.queryParams).then((response) => {
            this.tableData = response.data;
            this.total = response.total;
            this.loading = false
          })
        },
        tableRowClassName({row,rowIndex}) {
          if (row.failBatches>0) {
            return 'warning-row';
          } else{
            return '';
          }
        }

      }
    }
</script>

<style>
  .el-table .warning-row {
    background: #f5d1d0;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

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
      <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    style="width: 100%"

  >
    <el-table-column
      prop="date"
      label=""
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="集团上报情况"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="总批次"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上报成功批次"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上报失败批次"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="未上报批次"
      width="130"
      align="center">
    </el-table-column>
    <el-table-column
      prop="date"
      label="上报失败/未上报原因"
      width="200"
      align="center">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
    export default {
      name: "today",
      data(){
          return{
            datatime:'',
            formInline: {
              user: '',
              region: ''
            },
            tableData:[],
          }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        },
      }
    }
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="选择日期：">
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
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <span style="font-family: 微软雅黑;font-size: large;font-weight: 500;line-height: 50px" >告警报表</span>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"

    >
      <el-table-column
        prop="id"
        label="告警类型"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="总条数"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="已上报"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="未上报"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="未上报原因"
        width="240"
        align="center">
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped>

</style>

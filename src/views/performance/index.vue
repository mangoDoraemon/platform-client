<template>
  <div class="app-container">

  <el-row :gutter="10" class="mb8">
    <el-col :span="1.5">
      <span style="font-family: 微软雅黑;font-size: large;font-weight: 800" >性能上报</span>
    </el-col>
  </el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="选择日期：">
        <el-date-picker
          v-model="datatime"
          type="date"
          placeholder="选择日期" size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="对照批次号：">
        <el-input v-model="datatime" placeholder="请输入对照批次号" clearable size="small" style="width: 240px"  />
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
      label="对照批次号"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      label="模型名称"
      width="100"
      align="center">
    </el-table-column>
    <el-table-column
      prop="province"
      label="浙江省杭州市三墩机房(pod1)参考/对照"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="city"
      label="浙江省杭州市三墩机房(pod2)参考/对照"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="浙江省杭州市三墩机房(pod3)参考/对照"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="浙江省杭州市三墩机房(pod4)参考/对照"
      width="200"
      align="center">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="浙江POSS(池外)参考/对照"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="总计参考/对照"
      width="100"
      align="center">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return{
        datatime:'',
        formInline: {
          user: '',
          region: ''
        },
        tableData:[]
      }

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>


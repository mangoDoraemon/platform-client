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
        <span style="font-family: 微软雅黑;font-size: large;font-weight: 500;line-height: 50px" >工单报表</span>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :span-method="objectSpanMethod"
      show-summary
    >
      <el-table-column
        prop="id"
        label="工单类型"
        width="160"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="工单总量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="成功数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="失败数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="未上报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="失败原因"
        align="center">
      </el-table-column>

    </el-table>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <span style="font-family: 微软雅黑;font-size: large;font-weight: 500;line-height: 50px" >工单处理质量</span>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"

    >
      <el-table-column
        prop="id"
        label="工单类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="工单数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="及时率"
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
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
        datatime:''
      }
    },
    methods:{
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      onSubmit() {
        console.log('submit!');
      }

    }
  }
</script>

<style scoped>

</style>

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
      <el-form-item label="对照批次号：">
        <el-input v-model="id" placeholder="请输入对照批次号" clearable size="small" style="width: 240px"  />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      :summary-method="getSummaries"
      show-summary
    >
      <el-table-column
        prop="id"
        label="对照批次号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="name"
        label="模型名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="浙江省杭州市三墩机房(pod1)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="浙江省杭州市三墩机房(pod2)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="浙江省杭州市三墩机房(pod3)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="浙江省杭州市三墩机房(pod4)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="浙江POSS(池外)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="总计参考/对照"
        align="center">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: "detail",
    data(){
      return{
        datatime:new Date(),
        formInline: {
          user: '',
          region: ''
        },
        id:'',
        tableData1:[],
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
        }]
      }

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
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
      }
    }
  }
</script>

<style scoped>
  table {
    border-spacing: 0;
    border-collapse:separate;/* 如果值为collapse，则element表格下方会出现滚动条*/
  }
</style>

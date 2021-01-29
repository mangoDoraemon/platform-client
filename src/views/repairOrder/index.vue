<template>
  <div class="app-container">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="选择日期：">
        <el-date-picker :clearable="clearable"
          v-model="queryParams.dateTime"
           value-format="yyyy-MM-dd"
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
      v-loading="loading"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        prop="workOderType"
        label="工单类型"
        width="160"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="operationType"
        label="操作类型"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.operationType=="add" ? "新增": "变更"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="workOderCounts"
        label="工单总量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workOderSuccess"
        label="成功数"
        align="center">
      </el-table-column>

      <el-table-column
        prop="workOderNotReport"
        label="未上报"
        align="center">
      </el-table-column>
      <!--<el-table-column
        prop="workOderReason"
        label="失败原因"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.workOderNotReport>0 ? "失败原因": ""}}
        </template>
      </el-table-column>-->

    </el-table>

    <el-table
      :show-header="status"
      :data="tableData2"
      style="width: 100%"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        label="工单类型"
        width="160"
        align="center"
      >
        <template>
          {{this.a}}
        </template>
      </el-table-column>
      <el-table-column
        prop="operationType"
        label="操作类型"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.operationType=="add" ? "新增": "变更"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="workOderCounts"
        label="工单总量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workOderSuccess"
        label="成功数"
        align="center">
      </el-table-column>

      <el-table-column
        prop="workOderNotReport"
        label="未上报"
        align="center">
      </el-table-column>



    </el-table>



    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <span style="font-family: 微软雅黑;font-size: large;font-weight: 500;line-height: 50px" >工单处理质量</span>
      </el-col>
    </el-row>
    <el-table
      :data="tableData1"
      style="width: 100%"
    >
      <el-table-column
        prop="workOderType"
        label="工单类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="workOderCounts"
        label="工单数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workOderSuccess"
        label="及时率"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.workOderSuccess>0 ? Math.round(scope.row.workOderSuccess/scope.row.workOderCounts)*100.00 + "%": ""}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    import {getList,getCount,getCountBygdType} from "@/api/alarm/WorkOder";

    export default {
    name: 'index',
    data(){
      return{
          clearable:false,
          status:false,
        datatime:'',
        loading:false,
        tableData:[],
        dateParam:{},
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          dateTime:''
        },
        tableData1:[],
        tableData2:[],
        a:'总计'
      }
    },
      created(){
        this.getList();
      },
    methods:{
      onSubmit() {
         this.getList();
          console.log('submit!');

      },
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
      /*
      * 获取工单列表
      * */
      getList(){
        this.loading=true;
        if(this.queryParams.dateTime==''){
          this.queryParams.dateTime=this.parseTime(new Date())
        }

        getList(this.queryParams).then((response) => {
          this.tableData = response.data;
        })
        getCount(this.queryParams).then((response) => {
          this.tableData2 = response.data;
        })
        getCountBygdType(this.queryParams).then((response) => {
          this.tableData1 = response.data;
          this.loading=false
        })
        this.getType();

      },
      /**
       * 解析类型
       */
      getType(){
        let that=this;
        var num=that.tableData.length;
        console.log("数量"+num)
        for(var i=0;i<num;i++){
          if((that.tableData[i].operationType)=='add'){
            that.tableData[i].operationType='告警'
          }else {
            that.tableData[i].operationType='消除告警'
          }

        }
      },
    }
  }
</script>

<style scoped>

</style>

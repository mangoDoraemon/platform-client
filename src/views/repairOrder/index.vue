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
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找1111</el-button>
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

      show-summary
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
        prop="workOderFail"
        label="失败数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workOderNotReport"
        label="未上报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="workOderReason"
        label="失败原因"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.workOderNotReport>0 ? "失败原因": ""}}
        </template>

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
          {{ scope.row.workOderSuccess>0 ? "": ""}}
        </template>
      </el-table-column>

    <!--  <el-table-column prop="workOderSuccess" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state==true?'success':(scope.row.state==false?'danger':'')">{{ scope.row.state==true?'连通':'未连通' }}</el-tag>
        </template>
      </el-table-column>-->

    </el-table>
  </div>
</template>

<script>
    import {getList,getCount,getCountBygdType} from "@/api/alarm/WorkOder";

    export default {
    name: 'index',
    data(){
      return{
        datatime:'',
        loading:false,
        tableData:[],
        dateParam:{},
        /*tableData1:[
          workOderCounts=0,
          workOderSuccess=0
        ],*/
        tableData1:[],
        tableData2:[]
      }
    },
      created(){
        this.getList();
      },
    methods:{


      onSubmit() {
         /* var time=this.parseTime(this.datatime);
          this.dateParam = this.parseTime(time).substring(0, (time).indexOf(" "));*/
          console.log('submit!');

      },
      getList(){
        getList().then((response) => {
          this.tableData = response.data;
        })
        getCount().then((response) => {
          this.tableData2 = response.data;
        })
        getCountBygdType().then((response) => {
          this.tableData1 = response.data;
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

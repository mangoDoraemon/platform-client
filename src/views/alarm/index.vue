<template>
  <div class="app-container">
    <el-form :inline="true"  class="demo-form-inline" >
      <el-form-item label="选择日期：">
        <el-date-picker
          v-model="datatime"
          type="date"
          placeholder="选择日期" size="small"
          value-format="yyyy-MM-dd HH:mm:ss">
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
        prop="alarmId"
        label="告警ID"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="uploadTime"
        label="变更时间"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="变更类型"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="上报状态"
        width="240"
        align="center">
      </el-table-column>


    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList1"
    />
  </div>
</template>

<script>
  import {getList,getListByTime} from "@/api/alarm/alarmApi";
  export default {
    name: 'index',
    data() {
      return {
        loading:false,
        dateRange:'',
        datatime:'',
        tableData: [{
          type: '',
          alarmid: '',
          uploadtime: '',
          status: '',
        }],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
        },
        tableData:[],
        total:0
      }
    },
    created(){
      this.getList1();
    },
    methods: {
      onSubmit() {
        this.queryParams.pageNum = 1;
        let that=this;
        var uploadtime=that.datatime;
        getListByTime(uploadtime).then(
          response => {
            that.tableData = response.data;
            that.loading = false;
          }
        );;
        console.log(this.datatime);
      },
      /**
       * 查询告警列表
       */
      /*getList1(){
        this.loading = true;
        debugger
        getList(this.addDateRange(this.queryParams, this.dateRange)).then((response)=>{
          debugger
          this.tableData = response.rows;
          this.total = response.total;
          this.loading = false;
        })
      },*/
      getList1() {
        this.loading = true;
        getList(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
          this.tableData = response.rows;
          this.total = response.total;
          this.loading = false;
        })

      },

    }
  }
</script>

<style scoped>

</style>

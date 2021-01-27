<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" >
      <el-form-item label="选择日期：" >
        <el-date-picker
          v-model="datatime"
          type="date"
          placeholder="选择日期" size="small"
          @change="getList1"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="对照批次号：">
        <el-select v-model="queryParams.batchnum" placeholder="请选择">
         <el-option
          v-for="item in batchnum1"
          :key="item.batchnum"
          :label="item.label"
          :value="item.batchnum">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData1"
      :span-method="objectSpanMethod"
      v-loading="loading"
    >
      <el-table-column
        prop="batchnum"
        label="对照批次号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="modelname"
        label="模型名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckOne"
        label="浙江省杭州市三墩机房(pod1)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckTwo"
        label="浙江省杭州市三墩机房(pod2)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckThree"
        label="浙江省杭州市三墩机房(pod3)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckFour"
        label="浙江省杭州市三墩机房(pod4)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckFive"
        label="浙江POSS(池外)参考/对照"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckCounts"
        label="总计参考/对照"
        align="center">
      </el-table-column>
    </el-table>


    <!--<div class="el-table__body-wrapper is-scrolling-none"><table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 983px;"><colgroup><col name="el-table_8_column_53" width="168"><col name="el-table_8_column_54" width="163"><col name="el-table_8_column_55" width="163"><col name="el-table_8_column_56" width="163"><col name="el-table_8_column_57" width="163"><col name="el-table_8_column_58" width="163"></colgroup><tbody><tr class="el-table__row"><td rowspan="1" colspan="1" class="el-table_8_column_53  "><div class="cell"></div></td><td rowspan="1" colspan="1" class="el-table_8_column_54  "><div class="cell">9597/9592</div></td><td rowspan="1" colspan="1" class="el-table_8_column_55  "><div class="cell">14987/14964</div></td><td rowspan="1" colspan="1" class="el-table_8_column_56  "><div class="cell">1766/1759</div></td><td rowspan="1" colspan="1" class="el-table_8_column_57  "><div class="cell">6634/6634</div></td><td rowspan="1" colspan="1" class="el-table_8_column_58  "><div class="cell">{{this.tableData2[5]}}</div></td></tr>&lt;!&ndash;&ndash;&gt;</tbody></table>&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div>
 --> </div>
</template>

<script>
  import {getList,getListBybatchnum,getListByCount} from "@/api/alarm/batch"
  export default {
    name: "detail",
    data(){
      return{
        datatime:new Date(),
        formInline: {
          user: '',
          region: ''
        },
        loading:false,
        id:'',
        tableData1:[],
        tableData2:[],
        tableData: [{
          modelname:'',
          batchnum:'',
          ckOne:'',
          dzOne:'',
          ckTwo:'',
          dzTwo:'',
          ckThree:'',
           dzThree:'',
            dzFour:'',
            ckFive:'',
            dzFive:'',
            ckCounts:'',
            dzCounts:'',
        }],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          uploadTime:'',
          batchnum:''
        },
        batchnum1:[],
        total:10,
        a:1,
        arr:{}
      }

    },
    created(){
      this.getList1();

    },
    methods: {
      onSubmit() {
        console.log("当前选中的批次号:"+this.queryParams.batchnum);
        debugger
        getListBybatchnum(this.queryParams).then((response) => {
          debugger
          this.tableData1 = response.data;
          this.total = response.total;
        })
      },
      getList1(){
          this.loading=true;
          var time=this.parseTime(this.datatime);
          if(time!=null){
            this.queryParams.uploadTime=this.parseTime(time).substring(0, (time).indexOf(" "));
          }
          console.log("this.queryParams.uploadTime"+this.queryParams.uploadTime);
          getList(this.queryParams,this.dateRange).then((response) => {
            this.batchnum1 = response.data;
            this.total = response.total;

            for(var i=0;i<this.batchnum1.length;i++){
             /* console.log("this.batchnum1[i].batchnum"+this.batchnum1[i].batchnum)*/
              if(this.a<this.batchnum1[i].batchnum){
                this.a=this.batchnum1[i].batchnum
              }
            }
            console.log("aaaa"+this.a)
            this.queryParams.batchnum=this.a;
            getListBybatchnum(this.queryParams,this.dateRange).then((response) => {
                this.tableData1 = response.data;
                this.total = response.total;
              });
              this.loading=false;
          });
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

    }
  }
</script>

<style scoped>
  table {
    border-spacing: 0;
    border-collapse:separate;/* 如果值为collapse，则element表格下方会出现滚动条*/
  }
  table tr td:last-child{
    background-color: #1ab394;
  }
</style>

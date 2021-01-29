<template>
  <div class="app-container">
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="7" class="card-panel-col">
    <div class="card-panel" >
      <div class="card-panel-icon-wrapper icon-money">
        <svg-icon icon-class="error" class-name="card-panel-icon"  @click="dialogVisible = true" />
      </div>
      <div class="card-panel-description">
        <div class="card-panel-text">
         今日批次异常个数
        </div>
        <div  class="card-panel-num" > {{this.count1}}</div>
      </div>
    </div>
      </el-col>


    </el-row>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="700px" append-to-body>
        <div slot="title" class="header-title">
          <span class="title-name" >{{ title }}</span>
          <el-divider></el-divider>
        </div>
        <el-table
          :data="tableData3"
          v-loading="loading"
        >
          <el-table-column
            prop="batchnum"
            label="上报批次号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="difference"
            label="异常个数"
            align="center">
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getBatchnum"
        />
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>

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
        label="上报批次号"
        align="center">
      </el-table-column>

      <el-table-column
        prop="modelname"
        label="模型名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckOne"
        label="浙江省杭州市三墩机房(pod1)应报/已报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckTwo"
        label="浙江省杭州市石桥机房(pod2)应报/已报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckThree"
        label="浙江省杭州市学院路机房(pod3)应报/已报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckFour"
        label="浙江省杭州市三墩机房(pod4)应报/已报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="ckFive"
        label="浙江POSS(池外)应报/已报"
        align="center">
      </el-table-column>
      <el-table-column
        label="总计应报/已报"
        align="center">
        <template slot-scope="scope">
          <div> <a style="color: black">{{scope.row.ckCounts.split("/")[0]}}/</a><a :style="scope.row.ckCounts | changeStyle(scope.row.ckCounts)">{{scope.row.ckCounts.split("/")[1]}}</a></div>

        </template>
      </el-table-column>
    </el-table>


    <!--<div class="el-table__body-wrapper is-scrolling-none"><table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 983px;"><colgroup><col name="el-table_8_column_53" width="168"><col name="el-table_8_column_54" width="163"><col name="el-table_8_column_55" width="163"><col name="el-table_8_column_56" width="163"><col name="el-table_8_column_57" width="163"><col name="el-table_8_column_58" width="163"></colgroup><tbody><tr class="el-table__row"><td rowspan="1" colspan="1" class="el-table_8_column_53  "><div class="cell"></div></td><td rowspan="1" colspan="1" class="el-table_8_column_54  "><div class="cell">9597/9592</div></td><td rowspan="1" colspan="1" class="el-table_8_column_55  "><div class="cell">14987/14964</div></td><td rowspan="1" colspan="1" class="el-table_8_column_56  "><div class="cell">1766/1759</div></td><td rowspan="1" colspan="1" class="el-table_8_column_57  "><div class="cell">6634/6634</div></td><td rowspan="1" colspan="1" class="el-table_8_column_58  "><div class="cell">{{this.tableData2[5]}}</div></td></tr>&lt;!&ndash;&ndash;&gt;</tbody></table>&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div>
 --> </div>
</template>

<script>
  import {getList,getListBybatchnum,getListByCount,getBatchnum,count,getBatchnumApi } from "@/api/alarm/batch"
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
        total:0,
        a:1,
        arr:{},
        count1:0,
        dialogVisible: false,
        title:'异常信息',
        tableData3:[]
      }

    },
    filters :{
      changeStyle(value){
        if(value.split("/")[0]-value.split("/")[1] == 0){
            return {
              'color': 'black',
            }
        }else {
          return {
            'color': 'red',
          }
        }
      }
    },
    created(){
      this.getList1();
      this.getBatchnum();
      this.getCount();
    },
    methods: {

      onSubmit() {
        console.log("当前选中的批次号:"+this.queryParams.batchnum);
        getListBybatchnum(this.queryParams).then((response) => {
          this.tableData1 = response.data;
          this.total = response.total;
        })
      },
      getList1(){
          this.loading=true;
          let time=this.parseTime(this.datatime);
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getBatchnum(){
        getBatchnumApi(this.queryParams,this.dateRange).then((response) => {
          this.tableData3 = response.data;
          this.total = response.total;
          this.loading=false
        })

      },
      getCount(){
        setTimeout(this.count, 1000*60*5);
        count().then((response) => {
          this.count1 = response.data;
          console.log("总数为："+this.count1)
        })
      },




    }


  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: -5px;

    .card-panel-col {
      margin-bottom: 10px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  table {
    border-spacing: 0;
    border-collapse:separate;/* 如果值为collapse，则element表格下方会出现滚动条*/
  }
  table tr td:last-child{
    background-color: #1ab394;
  }
  .txtOne{
    color: #409EFF;
    margin-bottom: 20px;
  }
  .txtTwo{
    color: #F56C6C;
    margin-bottom: 20px;
  }



</style>

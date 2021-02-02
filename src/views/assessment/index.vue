<template>
  <div class="app-container">

    <el-card>
    <el-row :gutter="140">
      <el-col :span="14">
        <div>
          <el-row slot="header" class="content-box"><span><h4>IT云资源池物理服务器CPU利用率</h4></span></el-row>
          <el-row :gutter="25" style=" margin-top: 10px;margin-left: 30px">
            <el-col :span="14">
            <radial
              :percentNum="this.Au"
              speed="3"
              size="140"
              color="#0080FF"
              @animationFinished=""
              backgroundColor="#A9D0F5"
              content="已分配"/>
            </el-col>
            <el-col :span="10">
            <radial
              :percentNum="this.All"
              speed="3"
              size="140"
              color="#8abf50"
              @animationFinished=""
              backgroundColor="#c4dfa7"
              content="已上线"/>

            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-row slot="header" class="content-box"><span><h4>IT云资源池平台可用性</h4></span></el-row>
          <el-row style="margin-top: 10px">
            <radial
              percentNum="100"
              speed="3"
              size="140"
              color="#8abf50"
              @animationFinished=""
              backgroundColor="#c4dfa7"
              content="平台可用性"/>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row  style="padding: 20px 0px"><span><h4>工单处理质量</h4></span></el-row>
    <el-row>
      <el-table :data="tableData">
        <el-table-column label="工单类型" prop="type"></el-table-column>
        <el-table-column label="工单数量" prop="counts"></el-table-column>
        <el-table-column label="及时率" prop="timeliness">
        </el-table-column>
      </el-table>
    </el-row>
    </el-card>
  </div>
</template>

<script>
    import {find,getAunchedApi,getAllocatedApi} from "@/api/alarm/assessment/index";
    export default {
      name: 'index',
        data() {
            return {
                tableData: [{
                    type: '',
                    counts: '',
                    timeliness: ''
                }],
              //已上线
              Aunched:'',
              Au:0,
              //已分配
              All:0,
              Allocated:'',
              A:'',
              A1:'',
              B:'',
              B1:''
            }
        },
        created(){
            this.list();
            this.getAllocated();
            this.getAunched();

        },
        methods: {
          list: function () {
            find().then((response) => {
              this.tableData = response.data;
              console.log("tableData"+Object.keys(this.tableData).length)
              let num=Object.keys(this.tableData).length
              let product;
              debugger
               for(let i=0;i<num;i++){
                  this.tableData[i].timeliness=this.tableData[i].timeliness.substring(0,6)+"%";
                  console.log("this.tableData[i].timeliness" + this.tableData[i].timeliness)
                }
            })
          },
          getAunched(){
            getAunchedApi().then((response) => {
              this.Aunched = response.data;
              var a=this.Aunched
              this.A=Object.values(a);
              this.A1=Object.keys(a);
              this.Au=parseFloat(this.A.toString().substring(0,5));
            })
          },
          /**
           * 已分配
           */
          getAllocated(){
            let that=this;
            getAllocatedApi().then((response) => {
              this.Allocated = response.data;
              var a=that.Allocated
              that.B=Object.values(a);
              that.B1=Object.keys(a);
              that.All=parseFloat(that.B.toString().substring(0,5));
            })
          },
          toPercent(n){
            n = n || 2;
          　　return ( Math.round( this * Math.pow( 10, n + 2 ) ) / Math.pow( 10, n ) ).toFixed( n ) + '%';
          }
        }
  }
</script>

<style scoped>
  .content-box{
  //margin-top: 20px;
    padding: 20px 0px;
    border-bottom: 1px solid #ccc;
  }
  el-progress{
    padding: 20px;
  }
</style>

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
              content="未分配"/>

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
        <el-table-column label="及时率" prop="timeliness"></el-table-column>
      </el-table>
    </el-row>
    </el-card>
  </div>
</template>

<script>
    import {find,getAunched,getAllocated} from "@/api/alarm/assessment/index";
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
          list(){
              find().then((response) => {
                  this.tableData = response.data;
              })
          },
          format(percentage) {
            if(percentage==parseFloat(this.A.toString().substring(0,5))){
              return `${percentage}%`+'\n'+`${'已上线'}`;
            }else if(percentage==parseFloat(this.B.toString().substring(0,5))){
              return `${percentage}%`+'\n'+`${'已分配'}`;
            }

          },
          /**
           * 已上线
           */
          getAunched(){
            let that=this;
            getAunched().then((response) => {
              that.Aunched = response.data;
              var a=that.Aunched
              that.A=Object.values(a);
              that.A1=Object.keys(a);
              that.Au=parseFloat(that.A.toString().substring(0,5));
            })
          },
          /**
           * 已分配
           */
          getAllocated(){
            let that=this;
            getAllocated().then((response) => {
              this.Allocated = response.data;
              var a=that.Allocated
              that.B=Object.values(a);
              that.B1=Object.keys(a);
              that.All=parseFloat(that.B.toString().substring(0,5));
            })
          },
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

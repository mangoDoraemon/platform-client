<template>
  <div class="app-container">

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="批次详情" name="second" :key="'second'">
        <detail v-if="second"/>
      </el-tab-pane>
      <el-tab-pane label="今日概览" name="first" :key="'first'">
        <today v-if="first"/>
      </el-tab-pane>

    </el-tabs>

</div>
</template>

<script>
  import detail  from "../alarm/detail";
  import today from "../alarm/today";
  export default {
    name: 'index',
    components: {detail,today},
    data(){
      return{
        loading:false,
        datatime:'',
        formInline: {
          user: '',
          region: ''
        },
        tableData:[],
        first:false,
        second:true,
        activeName:'second',


      }
    },
    methods: {

      onSubmit() {
        console.log('submit!');
      },

      handleClick(tab, event) {
        this.activeName = tab.name;
        if(tab.name=='first'){
          this.first=true;
          this.second=false;
        }else if(tab.name=='second'){
          this.first=false;
          this.second=true;
        }
      }
    }
  }
</script>


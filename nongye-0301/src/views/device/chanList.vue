<template>
    <div>
      <ConTitle :topTitle="topTitle"></ConTitle>

      <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="所有设备" name="all">所有设备</el-tab-pane>
      <el-tab-pane label="LoRaWAN" name="LoRaWAN">LoRaWAN</el-tab-pane>
      <el-tab-pane label="LoRaPP" name="LoRaPP">LoRaPP</el-tab-pane>

      <!-- 表单 -->
      <div>
        <el-form ref="form" :model="query" label-width="80px">

          <el-form-item label="EUI">
          <el-input v-model="query.eui"></el-input>
          </el-form-item>
       
          <el-form-item label="在线状态">
        <el-select v-model="query.online" placeholder="请选择状态">
        <el-option label="在线" value=true></el-option>
        <el-option label="离线" value=false></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="设备群组">
        <el-select v-model="query.keyword" placeholder="请选择状态">
        <el-option label="威海农业基地" value="威海农业基地"></el-option>
        <el-option label="济南农业基地" value="济南农业基地"></el-option>
        <el-option label="菏泽农业基地" value="菏泽农业基地"></el-option>
        <el-option label="潍坊农业基地" value="潍坊农业基地"></el-option>
        </el-select>
        </el-form-item>
          
          <el-form-item label="绑定时间">
            <!-- <span style="margin-right: 10px;">绑定时间:</span> -->
            <el-date-picker
              v-model="query.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button-group size="small">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="onSubmit"
                >搜索</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-share"
                size="small"
                @click="clearFun"
                >清除条件</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="small"
                @click="refreshFun"
                >刷新</el-button
              >
            </el-button-group>
            <span> 搜索结果:{{ total }}</span>
          </el-form-item>

        </el-form>
      </div>
    </el-tabs>

      <el-table :data="gategroupList" style="width: 100% " fixed="true">
        <el-table-column type="index" > </el-table-column>
        <el-table-column prop="eui" label="EUI" > </el-table-column>
        <el-table-column prop="name" label="设备名称" > </el-table-column>
        <el-table-column prop="nums" label="传感器通道" > </el-table-column>
        <el-table-column prop="devGroup" label="设备群组" > </el-table-column>
        <el-table-column prop="loop" label="上报周期"></el-table-column>
        <el-table-column prop="mhz" label="频率"></el-table-column>
        <el-table-column  label="在线状态">
          <template slot-scope="scope">
          {{ scope.row.online | fornn  }}
        </template>
        </el-table-column>
        <el-table-column  label="绑定时间">
          <template slot-scope="scope">
          {{ scope.row.bTime | formatTime }}
        </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">重命名</el-button>
          <el-button type="text" size="small" @click="sensoredit(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.currPage"
        :page-sizes="[2, 4, 5, 10]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </template>
  
  <script>
  import ConTitle from '@/components/ConTitle.vue'
  import moment from 'moment'
  import {$sensor,$sensoredit} from '@/api/index.js'
  export default {
      naem:'gateGroup',
      components:{
          ConTitle
      },
      data(){
          return{
              topTitle: {
          type: "设备", //非首页，该页面的上一级
          text: "传感器列表",
          msg: "展示EUI",
          
        },
        gategroupList:[],
        total: 0, //数据的总条数
        query: {
        currPage: 1, //当前的页码
        pageSize: 5, //当前的每页条数
        eui: "",
        online:"",
        date: [],
        keyword:''

        },
        activeName:'all',
        
        agreement: "all",

          }
      },
      mounted(){
          this.getData()
      },

      computed:{
      dateStr() {
      // console.log(666);
      let [d1, d2] = this.query.date;
      // console.log(d1, d2);
      let time1 = d1 && d1.getTime();
      let time2 = d2 && d2.getTime();
      if (time1 && time2) {
        return time1 + "-" + time2;
      } else {
        return "";
      }
    },
    },

      methods:{
        getData() {
      var queryStr = {...this.query };
        if (queryStr != "") {
       queryStr.date = this.dateStr;
      }

      
      // console.log(queryStr);
      $sensor(queryStr).then((res) => {
        // console.log(res);
        this.gategroupList = res.data;
        this.total = res.total;
      });
      
    },
    sensoredit(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(id);
          $sensoredit({id:id}).then(
          res=>{
            if(res.msg=="success"){
              this.getData()
            }
          }
        )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleSizeChange(value) {
        console.log("每页显示的条数发生变化了", value);
      //   this.query.pageSize = value;
        // 当前页需要重置为1
        this.query.currPage = 1;
        // 重新获取数据
        this.getData();
      },
      // 当前的页码
      handleCurrentChange(page) {
        console.log("当前页被改变了", page);
        this.query.currPage = page;
        // 重新获取数据
        this.getData();
      },

      clearFun() {
      this.query = {
        currPage: 1, //当前的页码
        pageSize: 5, //当前的每页条数
        eui: "",
        online: "", //在线状态
        date: [], //保存从表单选择的开始和结束的日期
        agreement: "",
      };
      this.getData();
    },

    refreshFun() {
      //
      this.$router.go(0);
    },
    //更改tab
    changeTabFun() {
      console.log(this.activeName);
      this.query.agreement = this.activeName;
      this.getData();
    },

    onSubmit(){
      this.getData()
    },

      },
    filters: {
      //   将事件戳转日期时间
      formatTime(value) {
        return moment(value).format("YYYY-MM-DD");
      },
      fornn(value){
          // let ll=''
          // if(value){
          //     ll="在线"
          // }else{
          //     ll="离线"
          // }
          return value?'在线':'离线';
      }
    }
  }
  </script>
  
  <style>
  
  </style>
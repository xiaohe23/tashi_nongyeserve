<template>
    <div>
      <ConTitle :topTitle="topTitle"></ConTitle>
      <el-table :data="gategroupList" style="width: 100% " fixed="true">
        <el-table-column type="index" > </el-table-column>
        <el-table-column prop="eui" label="EUI" > </el-table-column>
        <el-table-column prop="name" label="设备名称" > </el-table-column>
        <el-table-column prop="nums" label="传感器通道" > </el-table-column>
        <el-table-column prop="loop" label="上报周期"></el-table-column>
        <el-table-column prop="mhz" label="频率"></el-table-column>
        <el-table-column prop="online" label="在线状态"></el-table-column>
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
          <el-button type="text" size="small">删除</el-button>
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
  import {$sensor} from '@/api/index.js'
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
        },
          }
      },
      mounted(){
          this.getData()
      },
      methods:{
      getData() {
        $sensor(this.query).then((res) => {
          // console.log(res);
          this.gategroupList = res.data;
          this.total = res.total;
        });
      },
      handleSizeChange(value) {
        console.log("每页显示的条数发生变化了", value);
      //   this.query.pageSize = value;
        // 当前页需要重置为1
        this.query.pageNum = 1;
        // 重新获取数据
        this.getData();
      },
      // 当前的页码
      handleCurrentChange(page) {
        console.log("当前页被改变了", page);
        this.query.pageNum = page;
        // 重新获取数据
        this.getData();
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
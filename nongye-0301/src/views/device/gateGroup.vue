<template>
  <div>
    <ConTitle :topTitle="topTitle"></ConTitle>

    <div class="clearfix">
    <el-form ref="form" :model="query" label-width="5rem" style=
    "background-color: #fff;height: 3.125rem;margin: .625rem 0 .625rem 0;">
      <el-form-item label="群组名称" >
          <el-input v-model="query.keyword" style="width: 25rem;line-height: 3.125rem;"></el-input>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>清除条件</el-button>
          <el-button class="addbtn" type="primary" @click="addFun"
          style="float: right;margin-top: .3125rem;margin-right: .3125rem;">新增群组+</el-button> 
      </el-form-item>
    </el-form>

  </div>
    
   <el-dialog :title= editId?editname[0]:editname[1]  :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="6.25rem"
        class="demo-ruleForm"
      >
        <el-form-item label="群组名称" :prop=ruleForm.groupName>
          <el-input
            v-model="ruleForm.groupName"
            placeholder="请输入群组名称"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="gategroupList" style="width: 100% " fixed="true">
      <el-table-column type="index" > </el-table-column>
      <el-table-column prop="groupName" label="群组名称" > </el-table-column>
      <el-table-column prop="nodeNums" label="传感器节点数量" > </el-table-column>
      <el-table-column prop="onlineNums" label="在线设备数量" > </el-table-column>
      <el-table-column prop="cTime" label="创建时间"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button  type="text" size="small"  
        @click="editFun(scope.row.id, scope.row.groupName)">重命名</el-button>

        <el-button type="text" size="small"
        @click="delFun(scope.row.id)">删除</el-button>
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
import {$gategroupList,$groupAdd,$groupEdit } from '@/api/index.js'

export default {
    naem:'gateGroup',
    components:{
        ConTitle
    },
    data(){
        return{
            topTitle: {
        type: "设备", //非首页，该页面的上一级
        text: "节点群组",
        msg: "以分组的形式管理节点设备，提供了搜索，添加新的群组，重命名，移动设备等功能",
      },
      gategroupList:[],
      total: 0, //数据的总条数
      query: {
        currPage: 1, //当前的页码
        pageSize: 5,
        eui:'', //当前的每页条数
        keyword:''
      },
      ruleForm: { groupName: "" },
      //   验证规则
      rules: {
        groupName: [
          { required: true, message: "请输入群组名称", trigger: "blur" },
        ],
      },
      dialogVisible: false,

      editId: "",
      editname:["修改群组名称","新建群组"]
    }
    },
    mounted(){
        this.getData()
    },
    methods:{

      onSubmit(){
        this.getData()
      },

    getData() {
      $gategroupList(this.query).then((res) => {
        // console.log(res);
        this.gategroupList = res.data;
        this.total = res.total;
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

    addFun() {
      // 显示弹窗
      this.dialogVisible = true;
    },

     // 修改
     editFun(id, name) {
      console.log("修改函数触发了", id, name);
      this.dialogVisible = true;
      this.editId = id;
      this.ruleForm.groupName = name;
    },
    // 确认添加
    handleOK() {
      // 判断是添加还是修改
      if (this.editId == "") {
        //添加
        this.addItem();
      } else {
        //修改
        this.editItem();
        this.editId == ""
      }
    },

    // 添加函数8
    addItem() {
     // validate是elememnt ui 的api
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // console.log("submit!");
          //调用添加接口
          $groupAdd({ groupName: this.ruleForm.groupName }).then((res) => {
            console.log(res);
            if (res.msg == "success") {
              //成功添加
              // 关闭弹窗
              this.dialogVisible = false;
              this.getData();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editItem() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("submit!");
          //调用添加接口
          $groupEdit({
            groupName: this.ruleForm.groupName,
            id: this.editId,
          }).then((res) => {
            console.log(res);
            if (res.msg == "success") {
              //成功添加
              // 关闭弹窗
              this.dialogVisible = false;
              this.getData();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
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
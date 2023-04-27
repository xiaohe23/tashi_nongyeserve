<template>
    <div>
      <ConTitle :topTitle="topTitle"></ConTitle>

      <el-form label-position="right" label-width="80px" :model="securityAdd"
      style="background-color: #fff;margin: 10px 0 0 0;
      height: 230px;padding: 5px;padding-left: 10px;">
  <el-form-item label="标签">
    <el-input v-model="securityAdd.tag" style="width: 200px;"></el-input>
  </el-form-item>
  <el-form-item label="访问权限">
    <el-input v-model="securityAdd.authority" style="width: 200px;"></el-input>
  </el-form-item>
  <el-form-item label="密钥状态">
    <el-select v-model="option" clearable placeholder="请选择" @change="optionchange">
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item" 
      :value="item"    
      >
    </el-option>
  </el-select>
  </el-form-item>
    <div style="display:flex;margin-right: 300px;">
      <div><el-button type="primary" size="small" @click="securityaddto">确认</el-button></div>
      <div><el-button size="small">取消</el-button></div>
    </div>
  </el-form>

    </div>
  </template>
  
  <script>
  import ConTitle from '@/components/ConTitle.vue'
  import {$securityadd} from '@/api/index.js'
  export default {
      name:'securityAdd',
      components:{
          ConTitle
      },
      data(){
          return{
          topTitle: {
            type: "子账号", //非首页，该页面的上一级
            text: "添加子账号-",
            msg: "可添加当前组织的子账号，并为其分配权限",         
          },
          securityAdd:{tag:"",authority:"",online:false},
          options:['未使用','使用中'],
          option:""
          }
      },
      methods:{
        optionchange(){
          if(this.option=="未使用"){
            this.securityAdd.online=false
          }else{
            this.securityAdd.online=true
          }       
      },
      securityaddto(){
        $securityadd(
          {security:1,username:2,type:3,
          desc:4
          })
        .then(
          res=>{
            console.log(res);
            if(res.msg == "success"){
              console.log("succss");
            }
          }
        )
      }
}
      
      
  }
  </script>
  
  <style>
  
  </style>
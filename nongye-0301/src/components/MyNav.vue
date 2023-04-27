<template>
  
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#0e2439"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-panel"></i>
          <span>首页</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/home/dashboard">仪表盘</el-menu-item>
          <el-menu-item index="/home/data">设备数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-luyouqi"></i>
          <span>设备</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/device/gateway">网关</el-menu-item>
          <el-menu-item index="/device/gategroup">设备群组</el-menu-item>
          <el-menu-item index="/device/chanList">传感器列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-fyxx"></i>
          <span>计费</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/fee/feeBalance">账户信息</el-menu-item>
          <el-menu-item index="/fee/rechargeList">充值记录</el-menu-item>
          <el-menu-item index="/fee/usageList">使用记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-signal"></i>
          <span>测量类型</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="4-1">仪表盘</el-menu-item>
          <el-menu-item index="4-2">设备数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-anquan"></i>
          <span>安全</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="/security/securityadd">添加密钥</el-menu-item>
          <el-menu-item index="/security/securityList">密钥列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="iconfont icon-account"></i>
          <span>账号</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item index="4-1">仪表盘</el-menu-item>
          <el-menu-item index="4-2">设备数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>

  </template>
  
  <script>
  export default {
    name: "MyNav",
    mounted(){
        // console.log(this.$router);
    }
  };
  </script>
  
  <style scoped lang="scss">
        .nav-con {
  overflow: hidden;
  width: 165px;
}
.el-menu {
  border-right: none;
  background:rgb(14,36,57);
}
.iconfont {
  margin-right: 6px;
  font-weight: bold;
  color: #fff;
}
  </style>
<template>
  
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#0e2439"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      :collapse="sidebar"
      
    >
     <!-- //动态渲染侧拉框 -->
      <el-submenu :index="item.path" v-for="item in routes" :key="item.path">
        <template slot="title">
          <i class="iconfont" :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
          <el-menu-item :index="item.path+'/'+i.path" v-for="i in item.children" :key="item.path+'/'+i.path"
          >{{ i.meta.title }}</el-menu-item>
          
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>

  </template>
  
  <script>
  import { mapGetters } from "vuex";
  export default {
    name: "MyNav",
    data(){
      return{
        routes: [],
      }
    },
    computed:{
      ...mapGetters(["sidebar"]),
    },
    mounted(){
        console.log(this.$router);
        let routes=[]
        this.$router.options.routes.forEach(
          item=>{
            if(item.meta){
              routes.push(item)
            }
          }
        )
        this.routes=routes
        console.log(this.routes);
    }
  };
  </script>
  
  <style scoped lang="scss">
  .nav-con {
  overflow: hidden;
  // width: 165px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
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
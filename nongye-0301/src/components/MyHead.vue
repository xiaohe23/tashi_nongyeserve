<template>
     <div class="header-con">
    <img src="../assets/img/logo.png" alt="" class="img1" />
    <span
        class="on-off"
        :class="sidebar ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="TOGGLE_SIDEBAR"
      ></span>
    <div class="header-text">
      <span>{{ username==''?'请登录':username }}{{ type == "1" ? "超级" : "普通" }}管理员</span>
      <img src="../assets/img/gita.gif" alt="" class="img2" />
      <span class="line">|</span>
      <span @click="LoginoutAction">退出登录</span>
      <img src="../assets/img/cn.png" alt="" class="img3" />
    </div>
  </div>

</template>
  
  <script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name: "MyHeader",
    computed: {
   ...mapGetters(["sidebar", "username", "type"]),
 },
   methods: {
   ...mapMutations(["TOGGLE_SIDEBAR"]),
   ...mapActions(["LoginoutAction"]),
   logout(){

   }
 },
  };
  </script>
  
  <style scoped lang="scss">
  .header-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-text {
    display: flex;
    align-items: center;
    color: #605897;
    span {
      margin-left: 5px;
      margin-right: 5px;
    }
    .line {
      color: #e0dfdf;
    }
  }
  .img1 {
    height: 40px;
  }
  .img2 {
    height: 40px;
  }
  .img3 {
    height: 50px;
  }
}
  </style>
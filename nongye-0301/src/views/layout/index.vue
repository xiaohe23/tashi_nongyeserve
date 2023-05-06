<template>
  <div class="container">
    <div class="header"><MyHead></MyHead></div>
    <div class="main">
      <div class="nav"><MyNav></MyNav></div>
      <div class="con" :class="sidebar ? 'con-w1' : 'con-w'">
        <!-- 子页路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
  
</template>

<script>
import MyHead from "@/components/MyHead.vue"
import MyNav from "@/components/MyNav.vue"
import { mapGetters } from "vuex";
export default {
    name:'layOut',
    components:{
      MyHead,
      MyNav
    },
    computed: {
    ...mapGetters(["sidebar"]),
  },
}
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  height: 98%;
  // background: lightgreen;
  display: flex;
  flex-direction:column;
  .header {
    width: 100%;
    height: 50px;
    // position: fixed;
    // top: 0;
    z-index: 100;
    background: #fff;
  }
  .main {
    height: calc(100% - 50px);
    // flex: 1;
    // background: #536986;
    display: flex;
    .nav {
      // width: 210px;
      height: 100%;
      background:rgb(14,36,57);
      color: #fff;
      overflow: hidden;
      // position: fixed;
      // margin-top: 50px;
    }
    .con {
      width: calc(100% - 165px);
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      padding: 10px;
      background-color: rgb(234,237,241);
      // margin-left: 165px;
      // margin-top: 50px;
      box-sizing: border-box;
      min-width: 600px;
    }
    .con-w {
      width: calc(100% - 200px);
      
    }
    .con-w1 {
      width: calc(100% - 64px);
      
    }
  }
}
</style>
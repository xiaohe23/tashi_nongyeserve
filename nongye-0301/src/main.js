import Vue from 'vue'
import App from './App.vue'
import "@/router/permission";
import router from './router'

import store from './store'
import "./assets/iconfont/iconfont.css"
import ElementUI, { Table } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//i18n语言包

import VueI18n from 'vue-i18n';

const fixElTableErr = (table) => {
  const oldResizeListener = table.methods.resizeListener;
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this));
  };
};
// 一定要在Vue.use之前执行此函数
fixElTableErr(Table);

//引入路由守卫
// 引入echarts

import * as echarts from 'echarts';

//将echarts 绑定到 vue的根节点

Vue.prototype.$echarts = echarts;
Vue.use(VueI18n);
Vue.use(ElementUI);
//i8n的配置
const i18n = new VueI18n({
  locale: store.getters.locale || 'zh',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
  messages: {
    'zh': require('./lang/zh'),   // 中文语言包
    'en': require('./lang/en')    // 英文语言包
  }
})

//mock.js
require('./mock')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

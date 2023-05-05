import Vue from 'vue'
import VueRouter from 'vue-router'

import layout from '../views/layout/index.vue'

const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/dashboard'
  },
  {
    path: '/home',
    name: 'home',
    component: layout,
    meta: { title: "首页", icon: "icon-panel" ,  type: "2"},
    children: [
      { path: "dashboard", name: "dashboard", 
      meta: { title: "仪表盘" ,type: "2"},
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue') },
      
      { path: "data", name: "data", 
      meta: { title: "设备数据" ,type: "2"},
      component: () => import(/* webpackChunkName: "data" */ '../views/dashboard/data.vue') }
    ]
  },
  {
    path:'/device',
    name:'device',
    component:layout,
    meta: { title: "设备", icon: "icon-luyouqi" ,type: "2"},
    redirect:'/device/gateway',
    children:[
      {
        path:'gateway',name:'gateway',
        meta: { title: "网关" ,type: "2"},
        component: () => import(/* webpackChunkName: "gateway" */ '../views/device/gateWay.vue') 
      },
      {
        path:'gategroup',name:'gategroup',
        meta: { title: "设备群组" ,type: "2"},
        component: () => import(/* webpackChunkName: "gategroup" */ '../views/device/gateGroup.vue') 
      },{
        path:'chanList',name:'chanList',
        meta: { title: "传感器列表" ,type: "2"},
        component: () => import(/* webpackChunkName: "chanList" */ '../views/device/chanList.vue') 
      }
      
    ]
  },
  {
    path:'/fee',
    name:'fee',
    component:layout,
    meta: { title: "计费", icon: "icon-fyxx" ,type: "2"},
    redirect:'/fee/feeBalance',
    children:[
      {
        path:'feeBalance',name:'feeBalance',
        meta: { title: "账户信息" ,type: "2"},
        component: () => import(/* webpackChunkName: "feeBalance" */ '../views/fee/feeBalance.vue') 
      },
      {
        path:'rechargeList',name:'rechargeList',
        meta: { title: "充值记录",type: "2"},
        component: () => import(/* webpackChunkName: "rechargeList" */ '../views/fee/rechargeList.vue') 
      },
      {
        path:'usageList',name:'usageList',
        meta: { title: "使用记录",type: "2"},
        component: () => import(/* webpackChunkName: "usageList" */ '../views/fee/usageList.vue') 
      }
    ]
  },
  {
    path:'/measurement',
    name:'measurement',
    component:layout,
    meta: { title: "测量类型", icon: "icon-signal" ,type: "2"},
    redirect:'/measurement/measurementadd',
    children:[
      {
        path:'measurementadd',name:'measurementAdd',
        meta: { title: "添加测量类型",type: "2"},
        component: () => import(/* webpackChunkName: "measurementAdd" */ '../views/measurement/measurementAdd.vue') 
      },
      {
        path:'measurementlist',name:'measurementlist',
        meta: { title: "测量类型列表",type: "2"},
        component: () => import(/* webpackChunkName: "measurementlist" */ '../views/measurement/measurementList.vue') 
      }
      
    ]
  },
  {
      path:'/security',
      name:'security',
      component:layout,
      meta: { title: "安全", icon: "icon-anquan" ,type: "1"},
      redirect:'/security/securityList',
      children:[
        {
          path:'securityadd',name:'securityadd',
          meta: { title: "添加密钥",type: "1"},
          component: () => import(/* webpackChunkName: "feeBalance" */ '../views/security/securityAdd.vue') 
        },
        {
          path:'securityList',name:'securitylist',
          meta: { title: "密钥列表",type: "1"},
          component: () => import(/* webpackChunkName: "rechargeList" */ '../views/security/securityList.vue') 
        },
     
      ]
    },
  {
    path: '/login',
    name: 'login',
    // meta: { title: "账号", icon: "icon-account" },
    redirect:'/login/loginindex',
    component: layout,
    children:[
      {
        path:'loginindex',name:'loginindex',
        meta: { title: "登录页",type: "2"},
        component: () => import(/* webpackChunkName: "feeBalance" */ '../views/login/index.vue') 
      },
    ]
  },
  {
    path: '*',
    name: 'page404',
    component: () => import(/* webpackChunkName: "page404" */ '../views/pageP404/indexP4.vue')
  },

]



const router = new VueRouter({
  routes
})



export default router

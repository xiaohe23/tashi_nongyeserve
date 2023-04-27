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
    children: [
      { path: "dashboard", name: "dashboard", 
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue') },
      
      { path: "data", name: "data", 
      component: () => import(/* webpackChunkName: "data" */ '../views/dashboard/data.vue') }
    ]
  },
  {
    path:'/device',
    name:'device',
    component:layout,
    redirect:'/device/gateway',
    children:[
      {
        path:'gateway',name:'gateway',
        component: () => import(/* webpackChunkName: "gateway" */ '../views/device/gateWay.vue') 
      },
      {
        path:'gategroup',name:'gategroup',
        component: () => import(/* webpackChunkName: "gategroup" */ '../views/device/gateGroup.vue') 
      },{
        path:'chanList',name:'chanList',
        component: () => import(/* webpackChunkName: "chanList" */ '../views/device/chanList.vue') 
      }
      
    ]
  },
  {
    path:'/fee',
    name:'fee',
    component:layout,
    redirect:'/fee/feeBalance',
    children:[
      {
        path:'feeBalance',name:'feeBalance',
        component: () => import(/* webpackChunkName: "feeBalance" */ '../views/fee/feeBalance.vue') 
      },
      {
        path:'rechargeList',name:'rechargeList',
        component: () => import(/* webpackChunkName: "rechargeList" */ '../views/fee/rechargeList.vue') 
      },
      {
        path:'usageList',name:'usageList',
        component: () => import(/* webpackChunkName: "usageList" */ '../views/fee/usageList.vue') 
      }
    ]
  },
  {
      path:'/security',
      name:'security',
      component:layout,
      redirect:'/security/securityList',
      children:[
        {
          path:'securityadd',name:'securityadd',
          component: () => import(/* webpackChunkName: "feeBalance" */ '../views/security/securityAdd.vue') 
        },
        {
          path:'securityList',name:'securitylist',
          component: () => import(/* webpackChunkName: "rechargeList" */ '../views/security/securityList.vue') 
        },
     
      ]
    },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
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

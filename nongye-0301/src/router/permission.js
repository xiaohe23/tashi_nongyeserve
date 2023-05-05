import router from './index.js';
import store from '@/store';
import {Message} from 'element-ui'
// 引入store ，获取登录状态
// 白名单 不需要守卫的页面放在里面
let whiteList = ['login', 'page404','loginindex'];
let typeList = ['/security/add', '/security/list'];
// console.log(whiteList);
// 判断登录状态，如果已经登录了，不需要守卫,没有登录，守卫并且跳转到登录页
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    // console.log("路由守卫", to, from, next);
    if (store.getters.token) {//判断是否登录，已经登录
        if (to.path == '/login') {
            // 跳转到首页
            next('/home/dashboard');
        } else if (typeList.indexOf(to.path) !== -1) {//说明这个页面是有权限限制的
            if (store.getters.type == "1") {//权限够了，放行
                next();
            } else {//权限不够，提示，跳转
                Message({
                    message: "您的权限不够，请使用超级管理员权限重新登录", type: "warning"
                });
                // 强制退出
                store.dispatch('LogoutAction');
                // 跳转登录页
                // next('/login');
            }
        } else {//页面没有权限限制，放行
            next();
        }
    } else {//没登录
        // 是否在白名单
        if (whiteList.indexOf(to.name) !== -1) {//在白名单
            next();
        } else {
            next('/login');
        }
    }
})
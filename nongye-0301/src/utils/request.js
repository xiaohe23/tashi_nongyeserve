console.log(process.env.VUE_APP_API_URL);

import axios from 'axios'
import Vue from 'vue';
import {Loading,Message} from 'element-ui'
import store from '@/store';
const service= axios.create({
    baseURL:process.env.VUE_APP_API_URL,
    timeout:10000
})

var loadObj = null
//添加拦截器
service.interceptors.request.use( (config)=> {
    // 设置旋转小图标
    if (!loadObj) {
        loadObj = Loading.service({
            text: "加载中...",
            spinner: "el-icon-loading",
            background: "rgba(0,0,0,0.5)",
            lock: true
        })
    }
    // token
    if (store.getters.token !== "") {
        config.headers['user-token'] = store.getters.token;
    }
    return config;
}, (error)=> {//失败
    return Promise.reject(error);
})

service.interceptors.response.use(function (res) {
    // console.log(27, res);
    // 报错信息
    Vue.nextTick(() => {
        loadObj.close();
        loadObj = null
    })
    if (res.data.code !== 666) {//报错
        Message({
            message: res.data.msg, type: "error"
        });
    }
    return res.data;

}, function (error) {
    return Promise.reject(error);
})

export default service

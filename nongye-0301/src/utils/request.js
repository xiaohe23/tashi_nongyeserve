import axios from 'axios'
import {Message} from 'element-ui'
const service= axios.create({
    baseURL:"http://localhost:3007",
    timeout:10000
})
//添加拦截器
service.interceptors.request.use(
    config=>{
        return config
    },
    err=>{
        return Promise.reject(err)
    }
)

service.interceptors.response.use(function (res) {
    // console.log(27, res);
    // 报错信息
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

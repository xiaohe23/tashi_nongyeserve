import axios from 'axios'

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

service.interceptors.response.use(
        response=>{
            return response.data
        },
        err=>{
            return Promise.reject(err)
        }
)

export default service

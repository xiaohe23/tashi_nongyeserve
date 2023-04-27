import resquest from "@/utils/request.js"

export const $deviceCount=()=>{
    return resquest.get('/device/count')
}
export const $sensorCount = () => {
    return resquest.get('/sensor/count');
}
export const $sensorList=()=>{
    return resquest.get('/device/sensorList')
}
export const $gatewayList = (params) => {
    return resquest.get('/gateway/list',{params});
}
export const $gategroupList = (params) => {
    return resquest.get('/group/list',{params});
}

export const $sensor = (params) => {
    return resquest.get('/sensor/list',{params});
}

export const $rechargeList = (params) => {
    return resquest.get('/fee/rechargeList',{params});
}


export const $usageList = (params) => {
    return resquest.get('/fee/usageList',{params});
}

// 增加 post
export const $groupAdd = (data) => {
    return resquest.post('/group/add', data);
}
//修改  post
export const $groupEdit = (data) => {
    return resquest.post('/group/edit', data);
}
//删除  post
export const $groupDel = (data) => {
    return resquest.post('/group/del', data);
}

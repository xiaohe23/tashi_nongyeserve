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
//传感器删除
export const $sensoredit=()=>{
    return resquest.get('/sensor//sensor/edit')
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

//获取金额
export const $balance = (params) => {
    return resquest.get('/fee/balance',{params});
}

export const $recharge= (data) => {
    return resquest.post('/fee/recharge',data);
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


//安全模块

export const $securitylist = (params) => {
    return resquest.get('/security/list', {params});
}

//删除密钥
export const $securitydel = (data) => {
    return resquest.post('/security/del', data);
}

export const $securityadd = (data) => {
    return resquest.post('/security/add', data);
}

export const $securityedit = (data) => {
    return resquest.post('/security/edit', data);
}

//measurement测量类型
export const $measurementlist = (params) => {
    return resquest.get('/measurement/list', {params});
}

export const $measurementadd = (data) => {
    return resquest.post('/measurement/add', data);
}

export const $measurementdel = (data) => {
    return resquest.post('/measurement/del', data);
}

export const $measurementedit = (data) => {
    return resquest.post('/measurement/edit', data);
}



//登录
export const $login = (data) => {
    return resquest.post('/account/login', data);
}
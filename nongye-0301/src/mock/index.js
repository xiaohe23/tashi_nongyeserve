const Mock = require('mockjs')

const userData = Mock.mock({
    // 20条数据
    "data|20": [{
        'eui|3': /[a-z][A-Z][0-9]/,
        
        "设备名称|1": [
            "空气传感器",
            "光照传感器",
            "温度传感器",
            "二氧化碳传感器"
          ],
          "国家|1":[
            "zh",
            "en",
            "us",
            "jp"
          ],
    }]
})
// agreement:"LoRaWAN"
// bTime:1628492841606
// country:"China"
// desc:"用于智慧农业的网关设备"
// eui:"XA536848573"
// id:"650000201502262919"
// mhz:"CN542-575"
// name:"智慧农业-网关"
// online:true
// uTime:1628492841606

Mock.mock('/api/user','get',userData)
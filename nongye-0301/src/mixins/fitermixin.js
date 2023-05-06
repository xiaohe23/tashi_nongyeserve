
import moment from 'moment'
let fitermixin={
    filters: {
        //   将事件戳转日期时间
        formatTime(value) {
          return moment(value).format("YYYY-MM-DD");
        },
        fornn(value){
            // let ll=''
            // if(value){
            //     ll="在线"
            // }else{
            //     ll="离线"
            // }
            return value?'在线':'离线';
        }
      }
}
export default fitermixin
import { $login } from '@/api';
import router from '@/router';
const user = {
    state: {
        account: "",//用户名
        username: "",//中文名
        type: "",//管理员的权限
        token: ""//令牌,是后台办颁发的，登录后会在后台生成一个唯一的令牌，只要登录后就带回给前台，可以在vuex中保存，vuex再做持久化处理，token可以保证登录的状态,唯一确定是这个用户，防止攻击
    },
    mutations: {
        //用户名
        SET_ACCOUNT(state, account) {
            // console.log('14' + account);
            state.account = account;
        },
        //中文名
        SET_USERNAME(state, username) {
            state.username = username;
        },
        //权限
        SET_TYPE(state, type) {
            state.type = type;
        },
        // token
        SET_TOKEN(state, token) {
            state.token = token;
        },
    },
    actions: {
        // 登录操作  异步操作或者是大数据量的计算
        LoginAction({ commit }, userInfo) {
            // console.log('action6');
            // console.log(commit);
            // console.log(userInfo);
            // 调用后台接口
            $login(userInfo).then(res => {
                console.log(res);
                if (res.msg == "success") {
                    // 调用mutations
                    commit('SET_ACCOUNT', res.data.account);
                    commit('SET_USERNAME', res.data.username);
                    commit('SET_TOKEN', res.token);
                    commit('SET_TYPE', res.data.type);
                    router.push('/home/dashboard');
                }
            })

        },
        LoginoutAction({ commit }){
            commit('SET_ACCOUNT', '');
            commit('SET_USERNAME', '');
            commit('SET_TOKEN', '');
            commit('SET_TYPE', '');
            router.push('/home/dashboard');
        }

    }
}

// 输出
export default user;
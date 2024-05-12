import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: {
      userSub: null,
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = { ...state.userInfo, ...payload };
    },
    setUserSub(state, sub) { 
      state.userInfo.userSub = sub;  
    }
  },
  getters: {
    getUserInfo: state => state.userInfo,
    getUserSub: state => state.userInfo.userSub  
  }
});
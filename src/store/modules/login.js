import * as api from "@/api/login.js";
import { Message } from "element-ui";
import router from "@/router";

const state = () => ({
  isLogin: false,
});

const getters = {};

const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
};

const actions = {
  async handleIsLogin({ state, commit }, params) {
    try {
      const { access_token } = await api.login(params);
      commit("setIsLogin", true);
      localStorage.setItem("token", access_token);
      Message.success("登录成功！");
      router.replace({ name: "Hq" });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

import * as api from "@/api/users.js";
import { Message } from "element-ui";

const state = () => ({
  userData: [],
  total: 0,
  params: {
    currentPage: 1,
    pageSize: 10,
    q: "",
    id: "",
    site: "",
    role: "",
    status: "",
  },
});

const mutations = {
  setUserData(state, userData) {
    state.userData = userData;
  },
  setTotal(state, total) {
    state.total = total;
  },
  setParams(state, params) {
    state.params = {
      ...state.params,
      ...params,
    };
  },
};

const actions = {
  async getUserData({ state, commit }) {
    try {
      const { currentPage, pageSize, q, id, site, role, status } = state.params;
      const params = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        q: q,
        id: id,
        site: site,
        group_id: role,
        is_active: status,
      };
      const { userData, count } = await api.getData(params);
      commit("setUserData", userData);
      commit("setTotal", count);
    } catch (err) {
      console.log(err.message);
    }
  },
  async changeStatus({ state, commit }, params) {
    try {
      const { id, type } = params;
      await api.changeStatus(id, type);
      Message.success(type === "activate" ? "启用成功！" : "停用成功！");
      const newUserData = state.userData.length
        ? state.userData.map((item) =>
            item.id === id
              ? type === "activate"
                ? { ...item, status: true }
                : { ...item, status: false }
              : { ...item }
          )
        : [];
      commit("setUserData", newUserData);
    } catch (err) {
      Message.error(err.message);
      console.log(err);
    }
  },
  async BatchChangeStatus({ state, commit }, params) {
    try {
      const { data, type } = params;
      await api.BatchChangeStatus(type, data);
      Message.success(
        type === "activate" ? "批量启用成功！" : "批量停用成功！"
      );
      const newUserData = state.userData.length
        ? state.userData.map((item) =>
            data.id.includes(item.id)
              ? type === "activate"
                ? { ...item, status: true }
                : { ...item, status: false }
              : { ...item }
          )
        : [];
      commit("setUserData", newUserData);
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

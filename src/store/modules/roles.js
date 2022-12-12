import * as api from "@/api/roles.js";

const state = () => ({
  params: { currentPage: 1, pageSize: 10, name: "", id: "" },
  total: 0,
  roleData: [],
});

const mutations = {
  setRoleData(state, roleData) {
    state.roleData = roleData;
  },
  setParams(state, params) {
    state.params = {
      ...state.params,
      ...params,
    };
  },
  setTotal(state, total) {
    state.total = total;
  },
};

const actions = {
  async getRoleData({ state, commit }) {
    try {
      const { pageSize, currentPage, id, name } = state.params;
      const params = {
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
        id: id,
        q: name,
      };
      const { roleData, count } = await api.getData(params);
      commit("setRoleData", roleData);
      commit("setTotal", count);
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

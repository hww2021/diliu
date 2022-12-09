import * as api from "@/api/roles.js";

const state = () => ({
  params: {},
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
};

const actions = {
  async getRoleData({ state, commit }) {
    try {
      const params = state.params;
      const { roleData, count } = await api.getData(params);
      commit("setRoleData", roleData);
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

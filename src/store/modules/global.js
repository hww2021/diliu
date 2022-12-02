import * as api from "@/api/global.js";

const state = () => ({
  roleData: [],
  siteData: {},
});

const mutations = {
  setRoleData(state, roleData) {
    state.roleData = roleData;
  },
  setSiteData(state, siteData) {
    state.siteData = siteData;
  },
};

const actions = {
  async getRoleData({ state, commit }) {
    const res = await api.getRoleData();
    commit("setRoleData", res);
  },
  async getSiteData({ state, commit }) {
    const res = await api.getSiteData();
    commit("setSiteData", res);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

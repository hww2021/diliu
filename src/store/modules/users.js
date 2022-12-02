import * as api from "@/api/users.js";

const state = () => ({
  userData: [],
  total: 0,
  params: { currentPage: 1, pageSize: 10 },
});

const mutations = {
  setUserData(state, userData) {
    state.userData = userData;
  },
  setTotal(state, total) {
    state.total = total;
  },
};

const actions = {
  async getUserData({ state, commit }) {
    try {
      const { currentPage, pageSize } = state.params;
      const params = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const { userData, count } = await api.getData(params);
      commit("setUserData", userData);
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

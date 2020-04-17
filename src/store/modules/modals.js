const state = {
  type: ""
};
const getters = {
  getBaseModal: state => name => state[name]
};
const mutations = {
  setBaseModal(state, { type, data }) {
    state[type] = data;
  }
};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};

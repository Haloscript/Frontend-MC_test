import { UserService } from "../../app/services/UserService";
const USERSERVICE = new UserService();

const state = {
  userListData: null,
  page: 1,
  activeItems: []
};
const getters = {
  getBaseData: state => name => state[name]
};
const mutations = {
  setBaseData(state, { type, data }) {
    state[type] = data;
  }
};
const actions = {
  getTenUsers({ state, commit }) {
    return new Promise((resolve, reject) => {
      const sendData = {
        page: state.page
      };
      USERSERVICE.getTenUsersData(sendData)
        .then(res => {
          commit("setBaseData", { type: "userListData", data: res });
          resolve();
        })
        .catch(err => reject(err));
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

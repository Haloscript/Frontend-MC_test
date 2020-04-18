import { UserService } from "../../app/services/UserService";
import { GoodService } from "../../app/services/GoodService";
const USERSERVICE = new UserService();
const GOODSERVICE = new GoodService();

const state = {
  userListData: null,
  page: 1,
  activeItems: [],
  selectUserData: null
};
const getters = {
  getBaseData: state => name => state[name],
  getSelectedData: state => name => state.selectUserData[name]
};
const mutations = {
  setBaseData(state, { type, data }) {
    state[type] = data;
  },
  setSelectedData(state, { type, data }) {
    state.selectUserData[type] = data;
  }
};
const actions = {
  /**
   * Получение всех работников
   * @param state
   * @param commit
   * @returns {Promise<unknown>}
   */
  getTenUsers({ state, commit }) {
    return new Promise((resolve, reject) => {
      USERSERVICE.getTenUsersData(state.page)
        .then(res => {
          commit("setBaseData", { type: "userListData", data: res });
          resolve();
        })
        .catch(err => reject(err));
    });
  },
  /**
   * Получение информации по одному работнику
   * @param commit
   * @param {number}userId
   * @returns {Promise<unknown>}
   */
  getOneUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      USERSERVICE.getOneUserData(userId)
        .then(user =>
          commit("setBaseData", { type: "selectUserData", data: user })
        )
        .catch(err => reject(err));
    });
  },
  addDataOnGoodTable({ state, commit }, data) {
    const pushedData = {
      // id: Math.floor(Math.random() * Math.floor(20)),
      title: data.goodName,
      price: Number(data.goodPrice),
      registrationDate: new Date(data.goodDate)
    };
    const newGoodArray = state.selectUserData.user_good.concat(pushedData);
    commit("setSelectedData", { type: "user_good", data: newGoodArray });
    commit("setBaseModal", { type: "type", data: "onePerson" });
    // GOODSERVICE.addGoodDataOnUser({
    //   owner_id: state.selectUserData.id,
    //   ...pushedData
    // });
  },
  editDataOnGoodTable({ state, commit }, data) {
    const changeDataIndex = state.selectUserData.user_good.findIndex(
      good => good.id === data.good_id
    );
    const pushedData = {
      id: Math.floor(Math.random() * Math.floor(20)),
      title: data.goodName,
      price: Number(data.goodPrice),
      registrationDate: new Date(data.goodDate)
    };
    state.selectUserData.user_good.splice(changeDataIndex, 1, pushedData);
    commit("setBaseModal", { type: "type", data: "onePerson" });
  },
  deleteOneGoodOnState({ state }, data) {
    state.selectUserData.user_good.splice(data.index, 1);
    GOODSERVICE.deleteOneGoodData(data.id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  saveUserAllData({ state, commit }) {
    return new Promise((resolve, reject) => {
      USERSERVICE.updateUserAllData(state.selectUserData).then(res =>
        console.log(res)
      );
      const changeDataIndex = state.userListData.users.findIndex(
        user => user.id === state.selectUserData.id
      );
      commit("setSelectedData", {
        type: "good_count",
        data: state.selectUserData.user_good.length
      });
      commit("setSelectedData", {
        type: "total_price",
        data: state.selectUserData.user_good.reduce(
          (prev, good) => prev + good.price,
          0
        )
      });
      commit("setSelectedData", {
        type: "fullName",
        data: `${
          state.selectUserData.lastName
        }.${state.selectUserData.firstName.charAt(0)}${
          state.selectUserData.middleName ? "." : ""
        }${state.selectUserData.middleName.charAt(0)}`
      });
      state.userListData.users.splice(changeDataIndex, 1, state.selectUserData);
      resolve();
      reject();
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

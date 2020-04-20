import { UserService } from "../../app/services/UserService";
import { GoodService } from "../../app/services/GoodService";
const USERSERVICE = new UserService();
const GOODSERVICE = new GoodService();

const state = {
  userListData: null,
  page: 1,
  activeItems: [],
  filter: "",
  sortPrice: "asc",
  sortCount: "asc",
  sorted: "",
  selectUserData: null,
  createUserData: {
    id: "",
    lastName: "",
    firstName: "",
    middleName: "",
    position: "",
    user_good: []
  }
};
const getters = {
  getBaseData: state => name => state[name],
  getSelectedData: state => name => state.selectUserData[name],
  getCreateUserData: state => name => state.createUserData[name]
};
const mutations = {
  setBaseData(state, { type, data }) {
    state[type] = data;
  },
  setSelectedData(state, { type, data }) {
    state.selectUserData[type] = data;
  },
  setCreateUserData(state, { type, data }) {
    state.createUserData[type] = data;
  }
};
const actions = {
  /**
   * Получение всех работников
   * @param state
   * @param commit
   * @param startSort
   * @returns {Promise<unknown>}
   */
  getTenUsers({ state, commit }, startSort = false) {
    return new Promise((resolve, reject) => {
      USERSERVICE.getTenUsersData(
        state.page,
        state.filter,
        startSort ? state.sorted : "",
        state.sortPrice,
        state.sortCount
      )
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
  /**
   * Добавление данных в таблицу мц пользователя вызов из модалки "addAndEditGoodModal"
   * @param state
   * @param commit
   * @param getters
   * @param {object} data
   */
  addDataOnGoodTable({ state, commit, getters }, data) {
    const placeCall = getters.getBaseModal("placeCall");
    const currentData = `${
      placeCall === "createUserModal" ? "createUserData" : "selectUserData"
    }`;
    const pushedData = {
      title: data.goodName,
      price: Number(data.goodPrice),
      registrationDate: new Date(data.goodDate)
    };
    const newGoodArray = state[currentData].user_good.concat(pushedData);
    if (placeCall === "createUserModal") {
      commit("setCreateUserData", { type: "user_good", data: newGoodArray });
      commit("setBaseModal", { type: "type", data: "addUser" });
    } else {
      commit("setSelectedData", { type: "user_good", data: newGoodArray });

      commit("setBaseModal", { type: "type", data: "onePerson" });
    }
  },
  /**
   * Редактирование данных мц по айдишнику, вызов из модалки "addAndEditGoodModal"
   * @param state
   * @param commit
   * @param {object} data
   */
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
  /**
   * Удаление и отвязка мц от пользователя
   * @param state
   * @param {object} data
   */
  deleteOneGoodOnState({ state }, data) {
    state.selectUserData.user_good.splice(data.index, 1);
    GOODSERVICE.deleteOneGoodData(data.id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  /**
   * Изминение или создание  пользовательских данных  и пуш их в таблицу
   * @param state
   * @param commit
   * @param dispatch
   * @param {string}type
   * @returns {Promise<unknown>}
   */
  saveUserAllData({ state, commit, dispatch }, type = "edit") {
    return new Promise((resolve, reject) => {
      const currentData = `${
        type === "create" ? "createUserData" : "selectUserData"
      }`;
      const currentMutation = `${
        type === "create" ? "setCreateUserData" : "setSelectedData"
      }`;

      USERSERVICE.updateUserAllData(state[currentData])
        .then(res => {
          const changeDataIndex = state.userListData.users.findIndex(
            user => user.id === state[currentData].id
          );
          commit(currentMutation, {
            type: "good_count",
            data: state[currentData].user_good.length
          });
          commit(currentMutation, {
            type: "total_price",
            data: state[currentData].user_good.reduce(
              (prev, good) => prev + good.price,
              0
            )
          });
          commit(currentMutation, {
            type: "fullName",
            data: `${state[currentData].lastName}.${state[
              currentData
            ].firstName.charAt(0)}${
              state[currentData].middleName ? "." : ""
            }${state[currentData].middleName.charAt(0)}`
          });
          if (type === "create") {
            commit("setCreateUserData", { type: "id", data: res.user_id });
            state.userListData.users.concat(state[currentData]);
            dispatch("clearState", type);
            resolve();
          }
          state.userListData.users.splice(
            changeDataIndex,
            1,
            state[currentData]
          );
          dispatch("clearState", type);
          resolve();
        })
        .catch(err => reject(err));
    });
  },
  /**
   * Удаление работника
   * @param state
   * @param getters
   */
  deleteSelectUserData({ state, getters, commit }) {
    const data = getters.getBaseModal("editableData");
    const userIndex = state.userListData.users.findIndex(
      user => user.id === data.id
    );
    state.userListData.users.splice(userIndex, 1);
    commit("setBaseModal", { type: "type", data: null });
    USERSERVICE.deleteFullUserData(data.id)
      .then(() => {})
      .catch(() => {});
  },
  clearState({ state }, type) {
    setTimeout(() => {
      if (type === "create") {
        state.createUserData = {
          lastName: "",
          firstName: "",
          middleName: "",
          position: "",
          user_good: []
        };
        return;
      }
      state.selectUserData = null;
    }, 1500);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

import {
  getTenUsers,
  getOneUser,
  updateUserData,
  deleteUserData
} from "../Api/User";
export class UserService {
  /**
   *
   * @param {string}page
   * @param {string}filter
   * @param {string}sorted
   * @param {string}sortPrice
   * @param {string}sortCount
   * @returns {Promise<unknown>}
   */
  getTenUsersData = (page, filter, sorted, sortPrice, sortCount) => {
    return new Promise((resolve, reject) => {
      const requestData = {
        page: page,
        filter: filter,
        sorted: sorted,
        sortPrice: sortPrice,
        sortCount: sortCount
      };
      getTenUsers(requestData)
        .then(users => resolve(users))
        .catch(err => reject(err));
    });
  };
  getOneUserData = field => {
    return new Promise((resolve, reject) => {
      getOneUser(field)
        .then(user => {
          user.total_price = user.user_good.reduce(
            (prev, good) => prev + good.price,
            0
          );
          resolve(user);
        })
        .catch(err => reject(err));
    });
  };
  updateUserAllData = field => {
    return new Promise((resolve, reject) => {
      updateUserData(field)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  deleteFullUserData = field => {
    return new Promise((resolve, reject) => {
      deleteUserData(field)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };
}

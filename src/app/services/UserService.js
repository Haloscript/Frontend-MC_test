import { getTenUsers, getOneUser, updateUserData } from "../Api/UserTable";
export class UserService {
  getTenUsersData = field => {
    return new Promise((resolve, reject) => {
      const requestData = {
        page: field
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
          console.log(res);
        })
        .catch(err => reject(err));
    });
  };
}

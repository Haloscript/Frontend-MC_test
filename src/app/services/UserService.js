import { getTenUsers } from "../Api/UserTable";
export class UserService {
  getTenUsersData = field => {
    console.log(field)
    return new Promise((resolve, reject) => {
      getTenUsers(field)
        .then(users => resolve(users))
        .catch(err => reject(err));
    });
  };
}

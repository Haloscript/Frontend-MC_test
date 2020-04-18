import { addGoodOnUser, deleteOneGood, editOneGood } from "../Api/Good";
export class GoodService {
  addGoodDataOnUser = field => {
    return new Promise((resolve, reject) => {
      addGoodOnUser(field)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  deleteOneGoodData = field => {
    return new Promise((resolve, reject) => {
      deleteOneGood(field)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  editDataOnGoodTable = field => {
    return new Promise((resolve, reject) => {
      editOneGood(field)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}

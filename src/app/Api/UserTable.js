import Request from "../request-methods";
const REQUEST = new Request();
/**
 * Получение всех пользователей
 * @param {object}data
 * @returns {Promise<unknown>}
 */
export const getTenUsers = data => REQUEST.create("get", "api/getUsers", data);

export const getOneUser = data =>
  REQUEST.create("getParams", "api/getOneUser", data);

export const updateUserData = data =>
  REQUEST.create("post", "api/updateUserData", data);

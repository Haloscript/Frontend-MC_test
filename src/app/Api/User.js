import Request from "../request-methods";
const REQUEST = new Request();
/**
 * Получение всех пользователей
 * @param {object}data
 * @returns {Promise<unknown>}
 */
export const getTenUsers = data => REQUEST.create("get", "api/getUsers", data);

/**
 * Получение данных одного пользователя
 * @param data
 * @returns {Promise<unknown>}
 */
export const getOneUser = data =>
  REQUEST.create("getParams", "api/getOneUser", data);

/**
 * Обновление данных пользователя
 * @param data
 * @returns {Promise<unknown>}
 */
export const updateUserData = data =>
  REQUEST.create("post", "api/updateUserData", data);

/**
 * Удаление данных одного пользователя
 * @param data
 * @returns {Promise<unknown>}
 */
export const deleteUserData = data =>
  REQUEST.create("getParams", "/api/deleteUser", data);

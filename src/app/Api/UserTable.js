import Request from "../request-methods";
const REQUEST = new Request();
/**
 *
 * @param {object}data
 * @returns {Promise<unknown>}
 */
export const getTenUsers = data => REQUEST.create("get", "api/getUsers", data);

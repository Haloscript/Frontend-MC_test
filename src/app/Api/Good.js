import Request from "../request-methods";
const REQUEST = new Request();

export const addGoodOnUser = data =>
  REQUEST.create("post", "/api/addGoodOnUser", data);

export const deleteOneGood = data =>
  REQUEST.create("getParams", "/api/deleteGood", data);

export const editOneGood = data =>
  REQUEST.create("post", "/api/editGood", data);

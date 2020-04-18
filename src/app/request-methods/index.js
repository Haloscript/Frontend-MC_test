import { MethodGet } from "./method-get";
import { MethodPost } from "./method-post";
import { MethodGetParams } from "./method-get-params";

export default class Request {
  static methods = {
    get: new MethodGet(),
    getParams: new MethodGetParams(),
    post: new MethodPost()
  };
  /**
   *
   * @param method
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  create = (method, url, data) => {
    return new Promise((resolve, reject) => {
      const Method = Request.methods[method];
      Method.request(url, data)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
}

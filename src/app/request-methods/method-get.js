import Axios from "./_axios";
import querystring from "querystring";

export class MethodGet {
  /**
   *
   * @param {string}url
   * @param {string}data
   */
  request = async (url, data) => {
    return await new Promise((resolve, reject) => {
      const uri = data ? `${url}?${querystring.stringify(data)}` : `${url}`;
      Axios.get(uri)
        .then(response => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  };
}

import Axios from "./_axios";

export class MethodGetParams {
  /**
   *
   * @param {string}url
   * @param {string}data
   */
  request = async (url, data) => {
    return await new Promise((resolve, reject) => {
      const uri = data ? `${url}/${data}` : `${url}`;
      Axios.get(uri)
        .then(response => {
          resolve(response);
        })
        .catch(err => reject(err));
    });
  };
}

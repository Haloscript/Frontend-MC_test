import Axios from "./_axios";
export class MethodPost {
  /**
   *
   * @param {string}url
   * @param {object}data
   */
  request = async (url, data) => {
    return await new Promise((resolve, reject) => {
      Axios.post(url, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };
}

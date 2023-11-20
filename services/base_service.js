import axios from "axios";

class ServiceBase {
  constructor() {
    this.get = (api, params) => {
      return axios.get(api, params);
    };
    this.post = (api, data, params) => {
      return axios.post(api, data, params);
    };
    this.put = (api, data, params) => {
      return axios.put(api, data, params);
    };
    this.delete = (api, params) => {
      return axios.delete(api, params);
    };
  }
}
export default new ServiceBase();

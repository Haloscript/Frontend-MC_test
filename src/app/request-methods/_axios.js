import axios from "axios";
import { baseUrl } from "../../_config";

export default axios.create({
  baseURL: baseUrl,
  header: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*"
  }
});

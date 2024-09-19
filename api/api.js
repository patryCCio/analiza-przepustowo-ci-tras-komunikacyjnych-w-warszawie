import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.32.132:4040/api/",
});


export default instance;

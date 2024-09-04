import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.218.132:5001",
});


export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.32.132:5001",
});


export default instance;

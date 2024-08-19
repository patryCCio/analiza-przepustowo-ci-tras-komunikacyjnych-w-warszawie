import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.43.64:5001",
});


export default instance;

import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:3000", // your server port
});

export default axiosPublic;
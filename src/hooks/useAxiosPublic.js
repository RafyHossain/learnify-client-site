import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://learnify-server-omega.vercel.app", 
});

export default axiosPublic;
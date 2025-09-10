import axios from "axios";

const instance = axios.create({
   baseURL: "http://localhost:5000/api", 
  // baseURL:"https://tracksub-2u8x.onrender.com/api"
});

export default instance;
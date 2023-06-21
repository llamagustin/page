import axios from 'axios';

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: import.meta.env.VITE_API_ENDPOINT,
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  }
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns;
  
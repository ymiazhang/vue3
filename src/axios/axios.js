import axios from "axios";
//创建axios的一个实例
var instance = axios.create({
  baseURL: "http://127.0.0.1:9000",
  timeout: 3000,
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(function(response){
  return response.data
},function(error){
  console.log('拦截器报错');
  return Promise.reject(error)
});
export default instance
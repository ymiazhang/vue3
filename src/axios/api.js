import req from "./axios.js";
export function list() {
  return req({
    url: "src/data/dataceshi.json",
    method: "get",
    headers: {
      authorization: sessionStorage.getItem("token"),
    },
  });
}
//新增注册
export function addUser(username, password) {
  return req({
    url: "http://10.33.38.36:9001/api/users/adduser",
    method: "post",
    data: {
      username: username,
      password: password,
    },
  });
}
//登录
// export function login(){
//   return req({
//     url
//   })
// }

// 测试
export function Ceshi() {
  return req({
    url: "http://127.0.0.1:4523/m1/2158507-0-default/api/getCeshi",
    method: "get",
  });
}
//宠物

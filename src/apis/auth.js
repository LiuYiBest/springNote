import request from "../helpers/request";

//接口路径
const  URL = {
  REGISTER: '/auth/register',       //注册
  LOGIN: '/auth/login',             //登录
  LOGOUT: '/auth/logout',           //退出
  GET_INFO: '/auth',                //登录状态
}

//导出接口
export default {
  //注册方法
  register({username, password}){
    return request(URL.REGISTER,'POST',{username,password})
  },
  //登录方法
  login({username,password}){
    return request(URL.LOGIN,'POST',{username,password})
  },
  //注销方法
  logout() {
    return request(URL.LOGOUT)
  },
  //登录状态
  getInfo(){
    return request(URL.GET_INFO)
  }
}

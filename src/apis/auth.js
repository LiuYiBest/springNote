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
  register({username, password}){
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}){
    return request(URL.LOGIN,'POST',{username,password})
  },
  logout() {
    return request(URL.LOGOUT)
  },
  getInfo(){
    return request(URL.GET_INFO)
  }
}

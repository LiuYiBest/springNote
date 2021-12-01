import request from "../helpers/request";

//接口路径
const  URL = {
  REGISTER: '/auth/register',       //注册
  LOGIN: '/auth/login',             //登录
  LOGOUT: '/auth/logout',           //退出
  GET_INFO: '/auth',                //登录状态
}

export default {
  register({username, password}){
    return request(URL.REGISTER,'POST',{username,password})
  }
}

import axios from 'axios'
import baseURLConfig from './config-baseURL'     //导入默认的URL

// console.log(baseURLConfig)

//Content-Type（内容类型），一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//服务器接口的域名
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

// 第一个参数url地址  第二个传递的类型(默认Get)  第三个参数是传递的数据（默认空）
export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      // validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
      validateStatus(status) {
        return (status >=200 && status < 300) || status === 400
      }
    }
    //传递的类型可能是小写get  需要转为大写
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    axios(option).then(res => {
      //如果状态是200的 直接拿到数据
      if(res.status === 200) {
        console.log("成功后取得的数据res",res.data)
        resolve(res.data)
      }else {
        console.error("失败后取得的数据res",res.data)
        reject(res.data)
      }
    }).catch(err=>{
      reject({msg: '网络异常'})
    })
  })
}

// 模拟一个请求的使用
// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })


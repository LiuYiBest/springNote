import axios from 'axios'

//Content-Type（内容类型），一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件
axios.defaults.headers.post['Context-Type'] = 'application/x-www-form-urlencoded'
//服务器接口的域名
axios.defaults.baseURL = 'https://note-server.hunger-valley.com'

// 第一个参数url地址  第二个传递的类型(默认Get)  第三个参数是传递的数据（默认空）
export default function  request(url, type="Get", data={}){
//    axios本身return的也是promise  再包裹一次 对数据进行二次处理    axios中get和post使用方法不一样
      return new Promise((resolve,reject)=>{
        let option={
          url,
          method: type,
          //`weix validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
          // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
          validateStatus(status){
            //判断返回的状态码
            return (status >= 200 && status < 300) || status ===400
          }
        }
      //可能是小写get  需要转为大写
        if (type.toLowerCase()==='get'){
          //params是get请求的参数   data是post的参数 根据文档去组装参数
          option.params = data
        }else{
          option.data = data
        }
        axios(option).then(res=>{
          //如果是对的 直接拿到数据
          if (res.status === 200){
            resolve(res.data)
          }else {
            reject(res.data)
          }
        }).cache(err=>{
          reject({msg:网络异常})
        })
      })
}

//模拟一个请求的使用
// request('/auth/login','Post',{username:"hunger",password:"123456"})
//   .then(data=>{
//     console.log(data)
// })


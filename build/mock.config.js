const fs = require('fs')
const path = require('path')

//本地地址
const mockBaseURL = 'https://localhost:8080'
//线上地址
const realBaseURL = 'https://note-server.hunger-valley.com'

//如果没有传递参数  则默认isDev是true   isDev是否开发环境
exports.config = function ({isDev = true} = {isDev:true})
{
  let fileTxt = `
    module.exports={
    baseURL: '${isDev ? mockBaseURL :realBaseURL}'
    }
  `
  //把字符串写入文件中
  fs.writeFileSync(path.join(__dirname,'../src/helpers/config-baseURL.js'),fileTxt)
}


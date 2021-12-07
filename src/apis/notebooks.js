import request from "../helpers/request";
import {friendlyDate} from '../helpers/util'
// 笔记本列表的API封装

const URL = {
  ADD: '/notebooks',       //增
  DELETE: '/notebooks/:id',         //删
  UPDATE: '/notebooks/:id', //改
  GET: '/notebooks'      //查
}

export default {

  // getAll(){
  //   return request(URL.GET)
  // },

  //获取笔记本列表
  getAll(){
    return new Promise((resolve,reject)=>{
      request(URL.GET).then(res=>{
      //  排序笔记本  直接比较时间戳字符串
        res.data = res.data.sort((notebook1,notebook2)=>notebook1.createdAt < notebook2.createdAt)
        res.data.forEach(notebook=>{
             notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
          })
        console.log("获取笔记本列表",res.data)
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },

  //更新笔记本的id  更新笔记本的标题    默认参数
  updateNotebook(notebookId,{title = ''}={title: ''}){
    return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },

  //删除笔记需要id
  deleteNotebook(notebookId){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  },

  //增加笔记  需要标题字段
  addNotebook({title=''}={title:''}){
    return request(URL.ADD ,'POST',{title})
  }

}



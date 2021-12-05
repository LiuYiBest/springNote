import request from "../helpers/request";

// 笔记本列表的API封装

const URL = {
  ADD: '/notebooks',       //增
  DELETE: '/notebooks/:id',         //删
  UPDATE: '/notebooks/:id', //改
  GET: '/notebooks'      //查
}

export default {

  getAll(){
    return request(URL.GET)
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
  addNoteBook({title=''}={title:''}){
    return request(URL.ADD ,'POST',{title})
  }

}



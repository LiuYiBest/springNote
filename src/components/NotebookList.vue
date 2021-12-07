<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click.prevent="onCreate"><i class="iconfont icon-plus"></i> 新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link v-for="notebook in notebooks" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span> {{notebook.title}}
              <!--      noteCounts 笔记本计数        -->
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
<!--         创建时间 多少分钟 小时 天 前创建笔记本    -->
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
            </div>
          </router-link>
        </div>
      </div>

    </main>

  </div>
</template>
<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
import { friendlyDate } from '@/helpers/util'

// window.Notebooks = Notebooks

export default {
  data () {
    return {
      notebooks: []
    }
  },

  created() {
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })

    Notebooks.getAll()
      .then(res => {
        this.notebooks = res.data
      })
  },

  methods: {
    // 创建笔记本
    onCreate() {
      //获取笔记本的标题
      let title = window.prompt('创建笔记本')
      //判断输入是否为空
      if(title.trim() === '') {
        alert('笔记本名不能为空')
        return
      }
      //调用新增笔记本接口
      Notebooks.addNotebook({ title })
        .then(res => {
          console.log("新增笔记",res)
          //创建时间
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
          //将新建笔记本数据放到最前面
          this.notebooks.unshift(res.data)
          alert(res.msg)
        })
    },
    //编辑笔记本标题
    onEdit(notebook) {
      console.log('edit...', notebook)
      let title = window.prompt('修改标题', notebook.title)
      //一个noteBooks的id 和title对象
      Notebooks.updateNotebook(notebook.id, { title })
        .then(res => {
          console.log("编辑笔记本",res)
          //修改当前标题
          notebook.title = title
          alert(res.msg)
        })
    },
    //删除笔记本
    onDelete(notebook) {
      console.log('delete', notebook)
      //用户确认是否输出  Boolean类型
      let isConfirm = window.confirm('你确定要删除吗?')
      if(isConfirm) {
        Notebooks.deleteNotebook(notebook.id)
          .then(res => {
            console.log("删除笔记本",res)
            //删除数据库的内容后  把页面指定book数据的下标删除掉
            this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
            alert(res.msg)
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>

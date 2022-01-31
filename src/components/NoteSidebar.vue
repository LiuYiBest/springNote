<template>
  <div class="note-sidebar">
    <span class="btn add-note" >添加笔记</span>
    <el-dropdown class="notebook-title"  @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        我的笔记本1 <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item  command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import Notebooks from '@/apis/notebooks'
// import Notes from '@/apis/notes'
// import Bus from '@/helpers/bus'

export default {
  // created() {
  //   Notebooks.getAll()
  //     .then(res => {
  //       this.notebooks = res.data
  //       this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId)
  //         || this.notebooks[0] || {}
  //       return Notes.getAll({ notebookId: this.curBook.id })
  //     }).then(res => {
  //     this.notes = res.data
  //     this.$emit('update:notes', this.notes)
  //     Bus.$emit('update:notes', this.notes)
  //   })
  // },

  data() {
    return {
      notebooks: [
        {
          id: 1,
          title: 'hello1',
        },
        {
          id: 2,
          title: 'hello2',
          updatedAtFriendly: '3分钟前'
        }
      ],
      notes:[
        {
          id:11,
          title: '第一个笔记',
          updatedAtFriendly: '刚刚'
        }
      ],
      // curBook: {}
    }
  },

  methods: {
    handleCommand(cmd){
      console.log(cmd)
    }

    // handleCommand(notebookId) {
    //   if(notebookId == 'trash') {
    //     return this.$router.push({ path: '/trash'})
    //   }
    //   this.curBook = this.notebooks.find(notebook => notebook.id == notebookId)
    //   Notes.getAll({ notebookId })
    //     .then(res => {
    //       this.notes = res.data
    //       this.$emit('update:notes', this.notes)
    //     })
    // },
    //
    // addNote() {
    //   Notes.addNote({ notebookId: this.curBook.id })
    //     .then(res => {
    //       console.log(res)
    //       this.notes.unshift(res.data)
    //     })
    // }

  }
}
</script>


<style lang="less" >
//@import url(../assets/css/note-sidebar.less);
@import url(../assets/css/note-sidebar.less);
</style>



import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Noteboos from '@/components/NotebookList.vue'
import Note from '@/components/NoteDetail.vue'
import Tash from '@/components/TashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebooks',
      name: 'Noteboos',
      component: Noteboos
    },
    {
      path: '/note/:noteId',
      name: 'NoteDetail',
      component: Note
    },
    {
      path: '/trash/:noteId',
      name: 'TashDetail',
      component: Tash
    }
  ]
})

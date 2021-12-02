<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from  '../helpers/bus'

export default {

  data() {
    return {
      username: '未登录',
    }
  },
  created() {
    Bus.$on('userInfo',user=>{
      this.username = user.username
    })
    //获取用户的数据
    Auth.getInfo().then(res=>{
      // console.log("用户的数据",res)
      if(res.isLogin){
        this.username = res.data.username
      }
    })
  },
  //  使用计算属性获取用户的名称
  computed: {
    slug() {
      return this.username.charAt(0)
    }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>

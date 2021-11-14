<template>
  <div id="sidebar">
    <Avatar></Avatar>
    <div class="icons">
      <router-link to="/notebook/"  title="笔记">
        <i class="iconfont icon-note"></i>
      </router-link>
      <router-link to="/noterBooks" title="笔记本">
        <i  class="iconfont icon-notebook"></i>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-trash"></i>
      </router-link>
    </div>
    <div class="logout" >
      <i class="iconfont icon-logout"></i>
    </div>
  </div>
</template>

<script >
import Avatar from "./Avatar";

export  default {
  components:{
    Avatar
  }
}
</script>

<style lang="less" scoped>

#sidebar {
  position: relative;
  width: 80px;
  text-align: center;
  background-color: #2c333c;
}
.icons {
  font-size: 20px;
  margin-top: 15px;
  a {
    padding: 6px 0;
    display: block;
    padding: 20px;
  }
}

.icons .router-link-active {
  top: 30px;
  background-color: #5e6266;
}
.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.iconfont {
  font-size: 20px;
  color: #fff;
}

</style>

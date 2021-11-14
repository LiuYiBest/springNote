<template>
    <h1>
        {{msg}}
    </h1>
</template>

<script>
    export default {
      name: 'Login',
      data() {
        return{
          msg: 'Login 登录注册页面'
        }
      }
    }
</script>

<style scoped>
h1{
  color: red;
}

</style>

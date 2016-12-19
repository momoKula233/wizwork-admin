<template>
  <div class="inputContainer">
    <h3 class="loginTitle">请登录</h3>
    <el-input
      class="inline-input"
      size="large"
      placeholder="请输入用户名"
      v-model="name">
    </el-input>
    <div class="middle"></div>
    <el-input
      class="inline-input"
      size="large"
      type='password'
      placeholder="请输入密码"
      v-model="passward">
    </el-input>
    <div class="loginButton">
      <el-button type="primary" :disabled="!name || !passward" @click="login">立即登陆</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        passward: '',
      }
    },
    methods: {
      login () {
        if (this.name != 'wizwork' && this.password != 'qwertyuiop') return alert('账号或密码错误');
        this.$router.push('manage');
      },
    },
  }
</script>

<style>
  .loginTitle {
    margin: 0 auto 20px auto;
    color: #999;
    font-size: 20px;
  }
  .inputContainer {
    width: 50%;
    margin: 200px auto;
  }
  .middle {
    height: 20px;
  }
  .loginButton {
    margin-top: 20px;
  }
</style>